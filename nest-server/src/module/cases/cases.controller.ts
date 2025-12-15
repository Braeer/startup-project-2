import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetRandomDto } from './dto/get-random.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllCases() {
    return this.casesService.getAllCases();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  getCaseById(@Param('id') id: number) {
    return this.casesService.getCaseById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('random')
  getRandomCasesId(@Query() query: { count?: number }) {
    return this.casesService.getRandomCasesId({ count: query.count });
  }

  @UseGuards(JwtAuthGuard)
  @Post('random-with-settings')
  getRandomCasesIdWithSettings(@Body() body: GetRandomDto) {
    return this.casesService.getRandomCasesIdWithSettings({
      count: body.count,
      type: body.type,
      difficulty: body.difficulty,
    });
  }
}
