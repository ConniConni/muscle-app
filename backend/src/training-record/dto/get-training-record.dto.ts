import { IsOptional, IsPositive, IsString } from 'class-validator';

export class TrainingRecordDto {
  @IsPositive()
  @IsOptional()
  exercise_id?: number;
  @IsString()
  @IsOptional()
  date?: string;
}
