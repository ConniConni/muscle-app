import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMstMuscleCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
