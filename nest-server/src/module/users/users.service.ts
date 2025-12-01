import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    const { password, ...rest } = user;

    return rest;
  }

  async getProfile(payload: any) {
    if (!payload || !payload.id) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const user = this.getById(payload.id);

    return user;
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Такой email уже зарегистрирован');
    }
    const hash = await argon2.hash(dto.password);
    return this.prisma.user.create({
      data: { username: dto.username, email: dto.email, password: hash },
    });
  }

  // TODO: нужно подтверждение что это тот пользователь что удаляет себя и нужно подтверждение на почту
  async deleteUser(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.getById(id);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
  }
}
