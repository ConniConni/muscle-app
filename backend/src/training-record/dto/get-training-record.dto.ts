import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class TrainingRecordDto {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  exercise_id?: number;
  @IsString()
  @IsOptional()
  date?: string;
}
