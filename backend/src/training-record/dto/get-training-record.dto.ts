import { Type } from 'class-transformer';
import { IsDateString, IsOptional, IsPositive } from 'class-validator';

export class TrainingRecordDto {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  exercise_id?: number;
  @IsDateString()
  @IsOptional()
  date?: string;
}
