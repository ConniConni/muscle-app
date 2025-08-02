import { IsInt, IsNotEmpty, IsIn } from 'class-validator';
import RequestStatus from 'src/common/requestStatus';

export class UpdateFriendshipDto {
  @IsInt()
  @IsNotEmpty()
  // statusに指定できる値を、[承認, 拒否] に限定する
  @IsIn([RequestStatus.ACCEPTED, RequestStatus.DECLINED])
  status: number;
}
