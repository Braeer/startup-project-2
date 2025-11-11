import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: AuthLoginDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

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

  async register(dto: AuthRegisterDto) {
    const existingUser = await this.userService.getByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const { password, ...user } = await this.userService.createUser(
      dto.username,
      dto.password,
      dto.email,
    );

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) {
      throw new BadRequestException('Некорректный токен');
    }

    const { ...user } = await this.userService.getById(result.id);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: this.config.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: this.config.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    });

    return { accessToken, refreshToken };
  }

  addRefreshTokenToResponse(refreshToken: string, res: Response) {
    const expiresIn = new Date();
    const days = this.config.getOrThrow<number>('JWT_REFRESH_EXPIRES_IN_DAYS');
    expiresIn.setDate(expiresIn.getDate() + days);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      domain: this.config.getOrThrow('COOKIE_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: this.config.getOrThrow<boolean>('IS_PRODUCTION')
        ? 'lax'
        : 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      domain: this.config.getOrThrow('COOKIE_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: this.config.getOrThrow<boolean>('IS_PRODUCTION')
        ? 'lax'
        : 'none',
    });
  }
}
