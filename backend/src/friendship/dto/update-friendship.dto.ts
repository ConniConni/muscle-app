import { IsInt, IsNotEmpty, IsIn } from 'class-validator';
import FriendshipRequestStatus from 'src/common/friendship-request-status';

export class UpdateFriendshipDto {
  @IsInt()
  @IsNotEmpty()
  // statusに指定できる値を、[承認, 拒否] に限定する
  @IsIn([FriendshipRequestStatus.ACCEPTED, FriendshipRequestStatus.DECLINED])
  status: number;
}
