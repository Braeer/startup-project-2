import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCases() {
    const result = await this.prisma.case.findMany();

    if (!result) {
      throw new BadRequestException('No cases found');
    }

    return result;
  }

  createCase(data: CreateCaseDto) {
    return true;
  }

  async getCaseById(id: number) {
    const res = await this.prisma.case.findUnique({
      where: { id: id.toString() },
    });

    if (!res) {
      throw new BadRequestException('Case not found');
    }

    return res;
  }

  async getRandomCasesId({ count = 1 }: { count?: number }) {
    const cases = await this.prisma.case.findMany({
      select: { id: true, type: true, difficulty: true },
    });

    if (cases.length === 0) {
      throw new BadRequestException('No cases available');
    }

    const shuffled = cases.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    return selected;
  }

  async getRandomCasesIdWithSettings({
    count = 1,
    type,
    difficulty,
  }: {
    count?: number;
    type?: string;
    difficulty?: string;
  }) {
    const cases = await this.prisma.case.findMany({
      where: {
        ...(type && { type }),
        ...(difficulty && { difficulty }),
      },
      select: { id: true, type: true, difficulty: true },
    });

    if (cases.length === 0) {
      throw new BadRequestException(
        'No cases available with the specified settings',
      );
    }

    const shuffled = cases.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    return selected;
  }

  async getUserCompletedCases(userId: string) {
    const completedCases = await this.prisma.complitedQuestion.findMany({
      where: {
        userId,
        type: 'success',
      },
      select: {
        id: true,
      },
    });

    return completedCases;
  }
}
