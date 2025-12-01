import { IsNumber, IsString } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  fio: string;

  @IsNumber()
  age: number;

  @IsString()
  gender: string;
}
