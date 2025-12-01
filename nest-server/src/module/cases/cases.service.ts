import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createCase(data: CreateCaseDto) {
    return true;
  }
}
