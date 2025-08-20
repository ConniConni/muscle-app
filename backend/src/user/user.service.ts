import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'; // bcryptはCommonJS形式のパッケージのため名前空間インポート

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // ユーザーIDまたはEmailが一致するユーザーを探す
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ userId: createUserDto.userId }, { email: createUserDto.email }],
      },
    });
    if (existingUser) {
      if (existingUser.userId === createUserDto.userId) {
        throw new ConflictException('このユーザーIDは既に使用されています。');
      }
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException(
          'このメールアドレスは既に使用されています。',
        );
      }
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
    const createUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    // 分割代入でcreateUserプロジェクトからpasswordプロパティを取り除き、
    // 残りのプロパティを新しいオブジェクresultにまとめる
    const { password, ...result } = createUser;
    return result;
  }

  async findAll() {
    const selectUser = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        userId: true,
        email: true,
      },
    });
    return selectUser;
  }

  async searchUsersByQuery(userId: string, currentId: number) {
    if (!userId || userId.trim() === '') {
      throw new BadRequestException('検索するユーザーIDを入力してください。');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        userId: { equals: userId },
        id: { not: currentId },
      },
      select: {
        id: true,
        userId: true,
        username: true,
      },
    });

    if (!user) {
      return null;
    }
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        requesterUserId: currentId,
        approvalUserId: user.id,
      },
      include: {
        approvalFriendStatus: { select: { name: true } },
      },
    });

    // 3. データをマージして返す
    const friendshipStatusName =
      friendship?.approvalFriendStatus?.name || 'NONE';

    const result = {
      ...user,
      friendshipStatus: friendshipStatusName,
    };

    return result;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        userId: true,
        email: true,
      },
      where: {
        id: id,
      },
    });
    return user;
  }

  async findByUserId(userId: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        userId: true,
        password: true,
      },
      where: {
        userId: userId,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return updateUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deleteUser;
  }
}
