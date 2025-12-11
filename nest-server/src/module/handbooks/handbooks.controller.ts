import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { HandbooksService } from './handbooks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('handbooks')
export class HandbooksController {
  constructor(private readonly handbooksService: HandbooksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHandbooks() {
    return this.handbooksService.getHandbooks();
  }

  @Get('types')
  @UseGuards(JwtAuthGuard)
  getHandbooksTypes() {
    return this.handbooksService.getHandbooksTypes();
  }

  @Get('types/:type')
  @UseGuards(JwtAuthGuard)
  getHandbooksByType(@Param('type') type: string) {
    return this.handbooksService.getHandbooksByType(type);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getHandbookById(@Param('id') id: string) {
    return this.handbooksService.getHandbookById(id);
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  getFavoriteHandbooks(@Req() req: any) {
    return this.handbooksService.getFavoriteHandbooks(req);
  }

  @Post('favorites/save/:handbookId')
  @UseGuards(JwtAuthGuard)
  saveFavoriteHandbook(
    @Req() req: any,
    @Param('handbookId') handbookId: string,
  ) {
    return this.handbooksService.saveFavoriteHandbook(req, handbookId);
  }

  @Post('favorites/remove/:handbookId')
  @UseGuards(JwtAuthGuard)
  removeFavoriteHandbook(
    @Req() req: any,
    @Param('handbookId') handbookId: string,
  ) {
    return this.handbooksService.removeFavoriteHandbook(req, handbookId);
  }
}
