import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { UsersModule } from './module/users/users.module';
import { CasesModule } from './module/cases/cases.module';
import { HandbooksModule } from './module/handbooks/handbooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    CasesModule,
    HandbooksModule,
  ],
})
export class AppModule {}
