import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
          { status: 1 },
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

  async findReceivedRequests(userId: number) {
    const requestUser = await this.prisma.friendship.findMany({
      where: {
        approvalUserId: userId,
        approvalFriendStatus: {
          name: 'PENDING',
        },
      },
      include: {
        // requesterUserIdが参照するuserモデルにアクセスし、idとニックネームを結果に追加
        requester: {
          select: {
            id: true,
            username: true,
          },
        },
        approvalFriendStatus: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createDate: 'desc',
      },
    });
    return requestUser;
  }

  async updateRequestStatus(
    friendshipId: number,
    newStatus: number,
    currentUserId: number,
  ) {
    // 1. まず、更新対象のFriendshipレコードを取得する
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    // 2. 権限チェック
    //    - レコードが存在しない
    //    - または、自分が申請された側(requesterUserId)ではない
    //    - または、ステータスがすでにPENDINGではない
    if (
      !friendship ||
      friendship.requesterUserId !== currentUserId ||
      friendship.status !== 0
    ) {
      throw new ForbiddenException('この申請を操作する権限がありません。');
    }

    // 3. 権限があれば、ステータスを更新する
    return this.prisma.friendship.update({
      where: {
        id: friendshipId,
      },
      data: {
        status: newStatus,
      },
    });
  }
}
