import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class ExerciseCategoryDto {
  @IsNotEmpty()
  @IsPositive()
  target_id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
