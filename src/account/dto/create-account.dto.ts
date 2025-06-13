import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  username: string; // userID

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  confirm_password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;
}