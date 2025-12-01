import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/edit')
  editProfile(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(req.user, dto);
  }
}
