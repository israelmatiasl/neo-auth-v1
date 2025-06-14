import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    private readonly PASSWORD_BCRYPT = 1;
    private readonly PASSWORD_DEFAULT = this.PASSWORD_BCRYPT;
    private readonly PASSWORD_BCRYPT_DEFAULT_COST = 10;

    /**
     * Hashea una contraseña usando bcrypt (equivalente a password_hash en PHP)
     * @param password - La contraseña en texto plano
     * @param algo - El algoritmo a usar (por defecto PASSWORD_DEFAULT)
     * @param options - Opciones adicionales como el cost
     * @returns Promise<string> - El hash de la contraseña
     */
    async passwordHash(
        password: string,
        algo: number = this.PASSWORD_DEFAULT,
        options: { cost?: number } = {}
    ): Promise<string> {
        // Validaciones similares a la implementación PHP
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        if (algo !== this.PASSWORD_BCRYPT) {
            throw new Error(`Unknown password hashing algorithm: ${algo}`);
        }

        // Determinar el cost (rounds)
        let cost = this.PASSWORD_BCRYPT_DEFAULT_COST;
        if (options.cost !== undefined) {
            cost = options.cost;
            if (cost < 4 || cost > 31) {
                throw new Error(`Invalid bcrypt cost parameter specified: ${cost}`);
            }
        }

        try {
            // bcrypt.hash maneja automáticamente la generación de salt
            return await bcrypt.hash(password, cost);
        } catch (error) {
            throw new Error('Failed to hash password');
        }
    }

    /**
     * Verifica una contraseña contra su hash (equivalente a password_verify en PHP)
     * @param password - La contraseña en texto plano
     * @param hash - El hash a verificar
     * @returns Promise<boolean> - True si la contraseña coincide
     */
    async passwordVerify(password: string, hash: string): Promise<boolean> {
        if (typeof password !== 'string' || typeof hash !== 'string') {
            return false;
        }

        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            return false;
        }
    }

    /**
     * Obtiene información sobre un hash (equivalente a password_get_info en PHP)
     * @param hash - El hash a analizar
     * @returns Información sobre el hash
     */
    passwordGetInfo(hash: string): {
        algo: number;
        algoName: string;
        options: { cost?: number };
    } {
        const defaultReturn = {
        algo: 0,
        algoName: 'unknown',
        options: {},
        };

        if (typeof hash !== 'string') {
            return defaultReturn;
        }

        // Verificar si es un hash bcrypt válido
        if (hash.startsWith('$2y$') && hash.length === 60) {
            const costMatch = hash.match(/^\$2y\$(\d+)\$/);
            const cost = costMatch ? parseInt(costMatch[1], 10) : this.PASSWORD_BCRYPT_DEFAULT_COST;
            
            return {
                algo: this.PASSWORD_BCRYPT,
                algoName: 'bcrypt',
                options: { cost },
            };
        }

        // También verificar otros formatos de bcrypt
        if ((hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2x$')) && hash.length === 60) {
            const costMatch = hash.match(/^\$2[abxy]\$(\d+)\$/);
            const cost = costMatch ? parseInt(costMatch[1], 10) : this.PASSWORD_BCRYPT_DEFAULT_COST;
            
            return {
                algo: this.PASSWORD_BCRYPT,
                algoName: 'bcrypt',
                options: { cost },
            };
        }

        return defaultReturn;
    }

    /**
     * Determina si un hash necesita ser rehaseado (equivalente a password_needs_rehash en PHP)
     * @param hash - El hash a verificar
     * @param algo - El algoritmo deseado
     * @param options - Opciones como el cost deseado
     * @returns boolean - True si necesita rehash
     */
    passwordNeedsRehash(
        hash: string,
        algo: number = this.PASSWORD_DEFAULT,
        options: { cost?: number } = {}
    ): boolean {
        const info = this.passwordGetInfo(hash);
        
        if (info.algo !== algo) {
            return true;
        }

        if (algo === this.PASSWORD_BCRYPT) {
            const desiredCost = options.cost ?? this.PASSWORD_BCRYPT_DEFAULT_COST;
            if (info.options.cost !== desiredCost) {
                return true;
            }
        }

        return false;
    }

    /**
     * Método de conveniencia que replica exactamente password_hash($password, PASSWORD_DEFAULT)
     * @param password - La contraseña a hashear
     * @returns Promise<string> - El hash de la contraseña
     */
    async hashPassword(password: string): Promise<string> {
        return this.passwordHash(password, this.PASSWORD_DEFAULT);
    }

    /**
     * Método de conveniencia para verificar contraseñas
     * @param password - La contraseña en texto plano
     * @param hash - El hash a verificar
     * @returns Promise<boolean> - True si coinciden
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return this.passwordVerify(password, hash);
    }
}