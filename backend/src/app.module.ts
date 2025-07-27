import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingRecordModule } from './training-record/training_record.module';
import { PrismaService } from './prisma.service';
import { ExerciseCategoryModule } from './exercise-category/exercise-category.module';
import { TargetAreaModule } from './target-area/target-area.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [TrainingRecordModule, ExerciseCategoryModule, TargetAreaModule, UserModule, AuthModule, FriendshipModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
