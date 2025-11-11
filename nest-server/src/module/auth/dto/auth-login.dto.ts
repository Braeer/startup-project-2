import { IsEmail, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail({}, { message: 'Некорректный email адрес' })
  email: string;

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
