import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as argon2 from 'argon2';

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

  async createUser(username: string, password: string, email: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Такой email уже зарегистрирован');
    }
    const hash = await argon2.hash(password);
    return this.prisma.user.create({
      data: { username, email, password: hash },
    });
  }
}
