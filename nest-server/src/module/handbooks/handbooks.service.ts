import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class HandbooksService {
  constructor(private readonly prismaService: PrismaService) {}

  getHandbooks() {
    return this.prismaService.handbook.findMany();
  }

  getHandbooksByType(type: string) {
    return this.prismaService.handbook.findMany({ where: { type } });
  }

  getHandbooksTypes() {
    return this.prismaService.handbook.findMany({
      select: { type: true },
      distinct: ['type'],
    });
  }

  getHandbookById(id: string) {
    return this.prismaService.handbook.findUnique({ where: { id } });
  }

  // saveFavoriteHandbook(user: { id: string }, handbookId: string) {
  //   return this.prismaService.user.update({
  //     where: { id: user.id },
  //     data: {
  //       favoriteHandbooks: {
  //         push: handbookId,
  //       },
  //     },
  //   });
  // }

  // removeFavoriteHandbook(user: { id: string }, handbookId: string) {
  //   return this.prismaService.user.update({
  //     where: { id: user.id },
  //     data: {

  //     },
  //   });
  // }

  saveFavoriteHandbook(userId: string, handbookId: string) {
    return this.prismaService.favoriteHandBooks.create({
      data: {
        userId,
        handbookId,
      },
    });
  }

  removeFavoriteHandbook(userId: string, handbookId: string) {
    return this.prismaService.favoriteHandBooks.deleteMany({
      where: {
        userId,
        handbookId,
      },
    });
  }

  getFavoriteHandbooks(userId: string) {
    return this.prismaService.favoriteHandBooks.findMany({
      where: {
        userId,
      },
    });
  }
}
