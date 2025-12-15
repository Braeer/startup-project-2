import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetRandomDto {
  @IsNumber()
  @IsOptional()
  count?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  difficulty?: string;
}
