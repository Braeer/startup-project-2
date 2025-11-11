import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async validate(req: Request) {
    const token = req.cookies?.refreshToken;
    if (!token) throw new ForbiddenException('Нет refresh token');

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
      return payload;
    } catch {
      throw new ForbiddenException('Неверный refresh token');
    }
  }

  // async authenticate(req: Request, options?: any) {
  //   try {
  //     const user = await this.validate(req);
  //     this.success(user);
  //   } catch (err) {
  //     this.error(err);
  //   }
  // }
}
