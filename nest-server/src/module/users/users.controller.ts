import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenGuard } from '../auth/guards/refresh-token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RefreshTokenGuard)
  getAllUsers() {
    return this.usersService.getUsers();
  }
}
