import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
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

  async deleteUser(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
