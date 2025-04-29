import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // アプリケーションがモジュールの初期化時にPrisma Clientに接続
  async onModuleInit() {
    await this.$connect();
  }
}
