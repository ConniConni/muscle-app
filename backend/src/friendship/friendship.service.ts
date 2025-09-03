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
    const friendships = await this.prisma.friendship.findMany({
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

    // 2. 取得したfriendships配列をmapでループし、
    //    各要素からrequesterオブジェクトだけを取り出して新しい配列を作成する
    const requestUser = friendships.map((friendship) => ({
      friendshipId: friendship.id,
      requesterId: friendship.requester.id,
      username: friendship.requester.username,
    }));
    return requestUser;
  }

  async findFriendshipStatus(approvalUserId: number, requesterUserId: number) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        requesterUserId: requesterUserId,
        approvalUserId: approvalUserId,
      },
      select: {
        approvalFriendStatus: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!friendship) {
      return null;
    }
    return friendship.approvalFriendStatus.name;
  }

  // フロントでフレンドシップ状態更新関数を呼び出す際に使用するフレンドシップテーブルidを返すapi
  async findFriendshipStatusPK(
    approvalUserId: number,
    requesterUserId: number,
  ) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        requesterUserId: requesterUserId,
        approvalUserId: approvalUserId,
      },
    });
    if (!friendship) {
      return null;
    }
    return friendship.id;
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
    //  - または、自分が申請された側(approvalUserId)ではない
    //  - または、ステータスがすでにPENDINGではない
    console.log(friendship);
    if (
      !friendship ||
      friendship.approvalUserId !== currentUserId ||
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
