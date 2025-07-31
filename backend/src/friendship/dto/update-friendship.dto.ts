import { IsInt, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateFriendshipDto {
  @IsInt()
  @IsNotEmpty()
  // statusに指定できる数値を、[1, 2] に限定する
  @IsIn([1, 2])
  status: number;
}
