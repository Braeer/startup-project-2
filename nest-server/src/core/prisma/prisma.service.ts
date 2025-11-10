import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public async onModuleInit() {
    Logger.log('Connecting to the database...');
    await this.$connect();
    Logger.log('Database connected.');
  }

  public async onModuleDestroy() {
    Logger.log('Disconnecting from the database...');
    await this.$disconnect();
    Logger.log('Database disconnected.');
  }
}
