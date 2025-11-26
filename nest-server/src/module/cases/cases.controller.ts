import { Controller, Get } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get('all')
  getAllCases() {
    return this.casesService.getAllCases();
  }
}
