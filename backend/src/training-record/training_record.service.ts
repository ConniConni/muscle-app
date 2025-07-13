import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';
import { PrismaService } from 'src/prisma.service';
import { formatInTimeZone } from 'date-fns-tz';
import { TrainingRecordDto } from './dto/get-training-record.dto';

@Injectable()
export class TrainingRecordService {
  constructor(private prisma: PrismaService) {}

  async findAll(trainingRecordDto: TrainingRecordDto, userId: number) {
    // dto取り出し
    const exercise_id = trainingRecordDto.exercise_id;
    const date = trainingRecordDto.date;

    // where条件の組み立て
    const where: any = { userId: userId };
    if (exercise_id !== undefined) {
      where.exerciseId = exercise_id;
    }
    if (date !== undefined) {
      where.date = new Date(date);
    }

    const response = await this.prisma.trainingRecord.findMany({
      where: where,
      include: {
        exerciseCategories: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    // フロントが期待する形に変換
    const result = response.map((record) => ({
      id: record.id,
      date: record.date,
      weight: record.weight,
      count: record.count,
      name: record.exerciseCategories?.name,
    }));
    return result;
  }

  async findById(id: number) {
    const response = await this.prisma.trainingRecord.findUnique({
      where: { id },
      include: {
        exerciseCategories: {
          select: {
            targetId: true,
          },
        },
      },
    });
    if (!response) return null;
    const result = {
      id: response.id,
      target_id: response.exerciseCategories?.targetId,
      exercise_id: response.exerciseId,
      date: response.date,
      weight: response.weight,
      count: response.count,
    };
    return result;
  }

  async create(
    createTrainingRecordDto: CreateTrainingRecordDto,
    userId: number,
  ) {
    const currentJstTime = formatInTimeZone(
      new Date(),
      'Asia/Tokyo',
      'yyyy-MM-dd HH:mm:ss.sss',
    );

    const training = await this.prisma.$executeRaw`
        INSERT INTO training_records (exercise_id,user_id,weight,date,count,create_date,update_date) VALUES
        (
        ${createTrainingRecordDto.exercise_id},
        ${userId},
        ${createTrainingRecordDto.weight},
        ${new Date(createTrainingRecordDto.date)},
        ${createTrainingRecordDto.count},
        ${currentJstTime}::timestamp,
        ${currentJstTime}::timestamp
        );
        `;
    return training;
  }

  async update(
    id: number,
    createTrainingRecordDto: CreateTrainingRecordDto,
    userId: number,
  ) {
    const record = await this.prisma.trainingRecord.findUnique({
      where: { id: id },
    });

    if (!record || record.userId !== userId) {
      throw new ForbiddenException('この操作を行う権限がありません。');
    }

    const updateResult = await this.prisma.trainingRecord.update({
      where: { id: id },
      data: {
        exerciseId: createTrainingRecordDto.exercise_id,
        date: new Date(createTrainingRecordDto.date),
        weight: createTrainingRecordDto.weight,
        count: createTrainingRecordDto.count,
      },
    });
    return updateResult;
  }

  async delete(id: number, userId: number) {
    const record = await this.prisma.trainingRecord.findUnique({
      where: { id: id },
    });

    if (!record || record.userId !== userId) {
      throw new ForbiddenException('この操作を行う権限がありません。');
    }
    await this.prisma.trainingRecord.delete({
      where: { id: id },
    });
  }
}
