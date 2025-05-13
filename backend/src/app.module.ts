import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuscleModule } from './muscle/muscle.module';
import { PrismaService } from './prisma.service';
import { MstMuscleCategoryModule } from './mst-muscle-category/mst-muscle-category.module';

@Module({
  imports: [MuscleModule, MstMuscleCategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
