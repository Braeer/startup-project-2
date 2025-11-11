import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  private async validateUser(dto: AuthLoginDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Неверный email или пароль');
    }

    const isValid = await argon2.verify(user.password, dto.password);

    if (!isValid) {
      throw new BadRequestException('Неверный email или пароль');
    }

    return user;
  }

  async login(dto: AuthLoginDto) {
    const { password, ...user } = await this.validateUser(dto);
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwt.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
      },
    };
  }

  async register(dto: AuthRegisterDto) {
    const existingUser = await this.userService.getByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const created = await this.userService.createUser(dto);
    const { password, ...user } = created;
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwt.sign(payload),
      user: user,
    };
  }
}
