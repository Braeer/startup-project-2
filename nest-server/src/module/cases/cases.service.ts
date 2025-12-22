import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { SaveUserCompleteCaseDto } from './dto/save-user-complete.dto';

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

  async getUserCompletedCases(userId: string, variant: 'success' | 'error') {
    const completedCases = await this.prisma.complitedCase.findMany({
      where: {
        userId,
        type: variant,
      },
      include: {
        case: {
          select: {
            title: true,
          },
        },
      },
    });

    return completedCases;
  }

  async saveUserCompletedCase(userId: string, dto: SaveUserCompleteCaseDto) {
    const caseExists = await this.prisma.case.findUnique({
      where: { id: dto.caseId },
    });

    if (!caseExists) {
      throw new BadRequestException('Case not found');
    }

    const existingRecord = await this.prisma.complitedCase.findFirst({
      where: {
        userId,
        caseId: dto.caseId,
      },
    });

    if (existingRecord) {
      return await this.prisma.complitedCase.update({
        where: { id: existingRecord.id },
        data: { type: dto.variant },
      });
    }

    const completedCase = await this.prisma.complitedCase.create({
      data: {
        userId,
        caseId: dto.caseId,
        type: dto.variant,
      },
    });

    return completedCase;
  }

  async getUserCompletedCaseById(userId: string, Id: string) {
    const completedCase = await this.prisma.complitedCase.findFirst({
      where: {
        userId,
        id: Id,
      },
      include: {
        case: true,
      },
    });

    if (!completedCase) {
      throw new NotFoundException('Completed case not found');
    }

    return completedCase;
  }

  async updateUserCompletedCase(userId: string, id: string) {
    await this.prisma.complitedCase.updateMany({
      where: {
        userId,
        id,
        type: 'error',
      },
      data: {
        type: 'success',
      },
    });

    return true;
  }

  async deleteUserCompletedCase(userId: string, id: string) {
    const deleted = await this.prisma.complitedCase.delete({
      where: {
        userId,
        id,
      },
    });

    return deleted;
  }
}
