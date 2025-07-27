import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsPositive()
  approvalUserId: number;
}
