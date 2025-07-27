import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) {}
  async create(
    createFriendshipDto: CreateFriendshipDto,
    requesterUserId: number,
  ) {
    const { approvalUserId } = createFriendshipDto;
    // 申請先が自分自身の場合は例外処理を発生させる
    if (requesterUserId === createFriendshipDto.approvalUserId) {
      throw new BadRequestException(
        '自分自身にフレンド申請を送ることはできません。',
      );
    }
    // フレンド申請済もしくはフレンド関係にある場合は例外処理を発生させる
    const existingRequest = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterUserId: requesterUserId, approvalUserId: approvalUserId },
          { requesterUserId: approvalUserId, approvalUserId: requesterUserId }, // 逆方向の申請もチェック
        ],
      },
    });
    if (existingRequest) {
      throw new ConflictException(
        '既にフレンド申請が存在するか、フレンド関係にあります。',
      );
    }
    const friendRequest = await this.prisma.friendship.create({
      data: {
        requesterUserId: requesterUserId,
        approvalUserId: approvalUserId,
      },
    });
    return friendRequest;
  }
}
