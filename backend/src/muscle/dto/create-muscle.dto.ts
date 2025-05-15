import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateMuscleDto {
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) //受け取った値をDate型に変換
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}
