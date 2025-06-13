import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AccountService } from './account/account.service';
import { UserService } from './user/user.service';
import { TantraService } from './tantra/tantra.service';
import { CreateAccountDto } from './account/dto/create-account.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly tantraService: TantraService,
  ) {}

  async registerAccount(dto: CreateAccountDto) {
    const { username, email, password, confirm_password, name, surname } = dto;

    // Validación de contraseñas
    if (password !== confirm_password) {
      throw new ConflictException('Passwords do not match');
    }

    // Verificar si ya existe el usuario por email o username
    const existing = await this.accountService.findByUsernameOrEmail(username, email);
    if (existing) {
      throw new ConflictException('Username or email already exists');
    }

    try {
      // Crear cuenta en NeoImperio (con hash y md5 dentro del servicio)
      const account = await this.accountService.createAccount({
        username,
        password,
        email,
        name,
        surname,
      });

      // Insertar datos en billcrux_8k (3 tablas)
      await this.userService.createUser(account.accountId, username);

      // Insertar ítem inicial en tantra_azteca
      await this.tantraService.addStarterItem(username);

      return {
        message: 'Registro exitoso',
        username: account.userId,
      };
    } catch (error) {
      console.error('Error al registrar cuenta:', error);
      // Aquí podrías hacer rollback manual si quieres en caso de error en cascada
      throw new InternalServerErrorException('Error al completar el registro');
    }
  }
}