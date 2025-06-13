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

    // Crear cuenta en NeoImperio (con hash y md5 dentro del servicio)
    const account = await this.accountService.createAccount({
      userID: username,
      password,
      email,
      name,
      surname,
    });

    try {
      // Insertar datos en billcrux_8k (3 tablas)
      await this.userService.createUser(account.id, account.userID);

      // Insertar ítem inicial en tantra_azteca
      await this.tantraService.addStarterItem(account.userID);

      return {
        message: 'Registro exitoso',
        username: account.userID,
      };
    } catch (error) {
      // Aquí podrías hacer rollback manual si quieres en caso de error en cascada
      throw new InternalServerErrorException('Error al completar el registro');
    }
  }
}