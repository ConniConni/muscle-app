import { Module } from '@nestjs/common';
import { MstService } from './mst.service';
import { MstController } from './mst.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MstController],
  providers: [MstService, PrismaService],
})
export class MstModule {}
