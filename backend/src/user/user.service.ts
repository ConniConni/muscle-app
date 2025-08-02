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

  async searchUsersByQuery(
    userId: string | undefined,
    username: string | undefined,
    currentUserId: number,
  ) {
    if (!userId && !username) {
      throw new BadRequestException(
        'ユーザーIDもしくはニックネームで検索してください。',
      );
    }

    let whereCondition: any = {};
    if (userId) {
      whereCondition.userId = userId;
    }
    if (username) {
      whereCondition.username = username;
    }

    whereCondition.id = currentUserId;

    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          // AND条件その１: 以下のOR条件
          {
            OR: [
              // OR条件その１: ユーザーIDがクエリと完全一致する
              {
                userId: { equals: userId },
              },
              // OR条件その２: ニックネームがクエリを部分一致で含む(ただし、大文字小文字の区別なし)
              {
                username: { contains: username, mode: 'insensitive' },
              },
            ],
          },
          // AND条件その２: ログインユーザーは検索結果から除外する
          {
            id: { not: currentUserId },
          },
        ],
      },

      select: {
        id: true,
        userId: true,
        username: true,
      },
    });

    return users;
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
