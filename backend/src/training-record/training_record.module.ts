import { Module } from '@nestjs/common';
import { TrainingRecordService } from './training_record.service';
import { TrainingRecordController } from './training_record.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrainingRecordController],
  providers: [TrainingRecordService, PrismaService],
})
export class TrainingRecordModule {}
