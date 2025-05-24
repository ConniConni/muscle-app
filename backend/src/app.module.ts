import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuscleModule } from './muscle/muscle.module';
import { PrismaService } from './prisma.service';
import { ExerciseCategoryModule } from './exercise-category/exercise-category.module';

@Module({
  imports: [MuscleModule, ExerciseCategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
