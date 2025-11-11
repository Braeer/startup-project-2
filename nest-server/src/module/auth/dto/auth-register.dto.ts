import { IsEmail, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @MinLength(3, { message: 'Имя пользователя должно быть не менее 3 символов' })
  username: string;
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;

  @IsEmail({}, { message: 'Некорректный email адрес' })
  email: string;
}
