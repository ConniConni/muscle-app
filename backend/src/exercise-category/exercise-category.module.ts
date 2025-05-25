import { Module } from '@nestjs/common';
import { ExerciseCategoryService } from './exercise-category.service';
import { PrismaService } from 'src/prisma.service';
import { ExerciseCategoryController } from './exercise-category.controller';

@Module({
  controllers: [ExerciseCategoryController],
  providers: [ExerciseCategoryService, PrismaService],
})
export class ExerciseCategoryModule {}
