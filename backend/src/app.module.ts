import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuscleModule } from './muscle/muscle.module';
import { PrismaService } from './prisma.service';
import { MstModule } from './mst/mst.module';

@Module({
  imports: [MuscleModule, MstModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
