import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDate, IsPositive } from 'class-validator';

export class CreateTrainingRecordDto {
  @IsNotEmpty()
  @IsNumber()
  exercise_id: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) //受け取った値をDate型に変換
  date: Date;

  @IsNotEmpty()
  @IsPositive()
  count: number;
}
