import { Prisma, PrismaClient } from './generated/client';
import { BadRequestException, Logger } from '@nestjs/common';
import { HANDBOOKS } from './data/handbooks';
import { CASES } from './data/cases';
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

    await prisma.$transaction([
      prisma.complitedCase.deleteMany(),
      prisma.handbook.deleteMany(),
      prisma.case.deleteMany(),
    ]);

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

      for (const caseItem of CASES) {
        await tx.case.create({
          data: {
            title: caseItem.title,
            type: caseItem.type,
            difficulty: caseItem.difficulty,
            fio: caseItem.fio,
            age: caseItem.age,
            gender: caseItem.gender,
            help: caseItem.help,
            clinicalCase: caseItem.clinical_case,
            analysis: caseItem.analysis,
            answers: caseItem.answers,
            correctAnswer: caseItem.correct_answer,
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
