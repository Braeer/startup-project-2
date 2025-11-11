import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return (
            req?.cookies?.accessToken ||
            ExtractJwt.fromAuthHeaderAsBearerToken()(req)
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        config.get<string>('JWT_ACCESS_SECRET') ||
        config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }
}
