import { Module } from '@nestjs/common';
import { TargetAreaService } from './target-area.service';
import { TargetAreaController } from './target-area.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TargetAreaController],
  providers: [TargetAreaService, PrismaService],
})
export class TargetAreaModule {}
