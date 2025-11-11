import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'default_jwt_secret',
    });
  }

  // payload — то, что вы подписываете в AuthService (id, email и т.д.)
  async validate(payload: any) {
    // Если в UsersService есть метод для получения пользователя по id — вернуть полную сущность
    if (this.usersService && typeof this.usersService.getById === 'function') {
      const user = await this.usersService.getById(payload.id);
      return user || payload;
    }
    // иначе возвращаем payload (будет доступно в req.user)
    return payload;
  }
}
