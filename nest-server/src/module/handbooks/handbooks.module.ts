import { Module } from '@nestjs/common';
import { HandbooksService } from './handbooks.service';
import { HandbooksController } from './handbooks.controller';

@Module({
  controllers: [HandbooksController],
  providers: [HandbooksService],
})
export class HandbooksModule {}
