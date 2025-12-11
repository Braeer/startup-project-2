import { Prisma, PrismaClient } from './generated/client';
import { BadRequestException, Logger } from '@nestjs/common';
import { HANDBOOKS } from './data/handbooks';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient({
  datasourceUrl: dotenv.config().parsed?.DATABASE_URL,
  transactionOptions: {
    maxWait: 5000,
    timeout: 10000,
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});
async function main() {
  try {
    Logger.log('Начало заполнения базы данных');

    await prisma.$transaction([prisma.handbook.deleteMany()]);

    await prisma.$transaction(async (tx) => {
      for (const handbook of HANDBOOKS) {
        await tx.handbook.create({
          data: {
            title: handbook.title,
            content: handbook.content,
            type: handbook.type,
            subtype: handbook.subtype,
          },
        });
      }
    });
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Ошибка при заполнении базы данных');
  } finally {
    Logger.log('Закрытие соединения с базой данных...');
    await prisma.$disconnect();
    Logger.log('Соединение с базой данных успешно закрыто');
  }
}

main();
