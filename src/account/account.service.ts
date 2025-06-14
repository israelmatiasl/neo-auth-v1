import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Account } from './account.entity';
import * as bcrypt from 'bcrypt';
import md5 from 'md5';
import { PasswordService } from './password.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account, 'neoimperio')
        private readonly accountRepository: Repository<Account>,
        private readonly passwordService: PasswordService
    ) {}

    async findByUsernameOrEmail(userId: string, email: string): Promise<Account | null> {
        return this.accountRepository.findOne({
            where: [ { userId }, { email } ]
        });
    }
    

    async createAccount(input: {
        username: string;
        password: string;
        email: string;
        name: string;
        surname: string;
    }): Promise<Account> {
        //const hashedPassword = await bcrypt.hash(input.password, 10);
        const hashedPassword = await this.passwordService.hashPassword(input.password);

        const md5Password = md5(input.password);

        const account = this.accountRepository.create({
            userId: input.username,
            hash: hashedPassword,
            password: md5Password,
            email: input.email,
            name: input.name,
            surname: input.surname,
        });

        return this.accountRepository.save(account);
    }
}