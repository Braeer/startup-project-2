import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  username?: string;

  @IsString()
  @MinLength(6)
  password?: string;
}
