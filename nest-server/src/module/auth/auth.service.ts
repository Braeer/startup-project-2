import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
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

  private issueTokens(userId: string) {
    const secretToken =
      this.config.getOrThrow<string>('JWT_SECRET') || 'defaultsecret';
    const payload = { id: userId };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: '1H',
      secret: secretToken,
    });

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: '30d',
      secret: secretToken,
    });

    return { accessToken, refreshToken };
  }

  private addCookie(
    res: Response,
    name: string,
    token: string,
    expiresMs: number,
  ) {
    const domain = this.config.get<string>('COOKIE_DOMAIN') || undefined;
    const isProd = this.config.get<boolean>('IS_PRODUCTION') || false;

    res.cookie(name, token, {
      httpOnly: true,
      domain,
      expires: new Date(Date.now() + expiresMs),
      secure: isProd,
      sameSite: isProd ? 'lax' : 'none',
    });
  }

  addTokensToResponse(
    tokens: { accessToken: string; refreshToken: string },
    res: Response,
  ) {
    const accessMs = 60 * 60 * 1000;
    const refreshDays = 30;
    const refreshMs = refreshDays * 24 * 60 * 60 * 1000;

    this.addCookie(res, 'accessToken', tokens.accessToken, accessMs);
    this.addCookie(res, 'refreshToken', tokens.refreshToken, refreshMs);
  }

  removeTokensFromResponse(res: Response) {
    const domain = this.config.get<string>('COOKIE_DOMAIN') || undefined;
    const isProd = this.config.get<boolean>('IS_PRODUCTION') || false;

    res.cookie('accessToken', '', {
      httpOnly: true,
      domain,
      expires: new Date(0),
      secure: isProd,
      sameSite: isProd ? 'lax' : 'none',
    });

    res.cookie('refreshToken', '', {
      httpOnly: true,
      domain,
      expires: new Date(0),
      secure: isProd,
      sameSite: isProd ? 'lax' : 'none',
    });
  }

  async login(dto: AuthLoginDto, res: Response) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);
    this.addTokensToResponse(tokens, res);
    return { user, accessToken: tokens.accessToken };
  }

  async register(dto: AuthRegisterDto, res: Response) {
    const existingUser = await this.userService.getByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const created = await this.userService.createUser(dto);
    const { password, ...user } = created;
    const tokens = this.issueTokens(user.id);
    this.addTokensToResponse(tokens, res);
    return { user, accessToken: tokens.accessToken };
  }

  async refreshTokens(req: Request, res: Response) {
    // eslint-disable-next-line
    let payload: any = (req as any).user;

    if (!payload) {
      // eslint-disable-next-line
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        throw new BadRequestException('Отсутствует refresh token');
      }

      try {
        payload = await this.jwt.verifyAsync(refreshToken, {
          secret: this.config.get<string>('JWT_SECRET'),
        });
      } catch {
        throw new ForbiddenException('Некорректный refresh token');
      }
    }

    // eslint-disable-next-line
    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const tokens = this.issueTokens(user.id);
    this.addTokensToResponse(tokens, res);

    const { password, ...userSafe } = user;
    return { user: userSafe, accessToken: tokens.accessToken };
  }
}
