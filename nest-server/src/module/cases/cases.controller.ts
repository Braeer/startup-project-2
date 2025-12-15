import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetRandomDto } from './dto/get-random.dto';
import { SaveUserCompleteCaseDto } from './dto/save-user-complete.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('user/completed')
  getUserCompletedCases(
    @Query() query: { type: 'error' | 'success' },
    @Req() req: any,
  ) {
    return this.casesService.getUserCompletedCases(req.user.id, query.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/completed/:id')
  getUserCompletedCaseById(@Req() req: any, @Param('id') id: string) {
    return this.casesService.getUserCompletedCaseById(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user/save-case')
  saveUserCompletedCase(
    @Req() req: any,
    @Body() body: SaveUserCompleteCaseDto,
  ) {
    return this.casesService.saveUserCompletedCase(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/update-case/:id')
  updateUserCompletedCase(@Req() req: any, @Param('id') id: string) {
    return this.casesService.updateUserCompletedCase(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/delete-case/:id')
  deleteUserCompletedCase(@Param('id') id: string, @Req() req: any) {
    return this.casesService.deleteUserCompletedCase(req.user.id, id);
  }
}
