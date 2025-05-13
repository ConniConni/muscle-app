import { Module } from '@nestjs/common';
import { MstMuscleCategoryService } from './mst-muscle-category.service';
import { MstMuscleCategoryController } from './mst-muscle-category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MstMuscleCategoryController],
  providers: [MstMuscleCategoryService, PrismaService],
})
export class MstMuscleCategoryModule {}
