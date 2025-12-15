import { IsIn, IsString } from 'class-validator';

export class SaveUserCompleteCaseDto {
  @IsIn(['error', 'success'])
  variant: 'error' | 'success';

  @IsString()
  caseId: string;
}
