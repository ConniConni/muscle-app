import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { PrismaService } from 'src/prisma.service';
import FriendshipRequestStatus from 'src/common/friendship-request-status';

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
        requesterUserId: requesterUserId,
        approvalUserId: approvalUserId,
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

  async findFriendsAll(userId: number) {
    const friendsList = await this.prisma.friendship.findMany({
      where: {
        approvalUserId: userId,
        status: FriendshipRequestStatus.ACCEPTED,
      },
      select: {
        updateDate: true,
        requester: {
          // requesterUserIdが参照するuserモデルにアクセスし、idとニックネームを結果に追加
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        updateDate: 'desc',
      },
    });
    const friends = friendsList.map((friendship) => {
      return friendship.requester;
    });
    return friends;
  }

  async findReceivedRequests(userId: number) {
    const requestUser = await this.prisma.friendship.findMany({
      where: {
        approvalUserId: userId,
        status: FriendshipRequestStatus.PENDING,
      },
      include: {
        // requesterUserIdが参照するuserモデルにアクセスし、idとニックネームを結果に追加
        requester: {
          select: {
            id: true,
            username: true,
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
    // 更新対象のFriendshipレコードを取得
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
      // approvalFriendStatusからステータスのマスタデータを取得
      include: {
        approvalFriendStatus: true,
      },
    });

    // 以下を確認し更新対象でない場合はステータス更新（承認/拒否の操作）は行わない
    //  - レコードが存在しない
    //  - または、自分が申請された側(requesterUserId)ではない
    //  - または、ステータスがすでにPENDINGではない
    if (
      !friendship ||
      friendship.requesterUserId !== currentUserId ||
      friendship.status !== FriendshipRequestStatus.PENDING
    ) {
      throw new ForbiddenException('この申請を操作する権限がありません。');
    }

    // ステータス更新（承認/拒否の操作）
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
