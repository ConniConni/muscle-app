import { Injectable } from '@nestjs/common';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';
import { PrismaService } from 'src/prisma.service';
import { TrainingData } from 'src/types';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { TrainingRecordDto } from './dto/get-training-record.dto';

@Injectable()
export class TrainingRecordService {
  constructor(private prisma: PrismaService) {}

  async findAll(trainingRecordDto: TrainingRecordDto) {
    // dto取り出し
    const exercise_id = trainingRecordDto.exercise_id;
    const date = trainingRecordDto.date;

    // where条件の組み立て
    const where: any = {};
    if (exercise_id !== undefined) {
      where.exerciseId = exercise_id;
    }
    if (date !== undefined) {
      where.date = new Date(date);
    }

    const response = await this.prisma.trainingRecord.findMany({
      where,
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

  // async findAll() {
  //   const result = await this.prisma.$queryRaw`
  //   SELECT
  //     tr.id,
  //     tr.date,
  //     tr.weight,
  //     tr.count,
  //     ec.name
  //   FROM training_records as tr
  //   INNER JOIN
  //     exercise_categories as ec
  //   ON tr.exercise_id = ec.id
  //   ORDER BY tr.date DESC;
  //   `;
  //   return result;
  // }

  async findAllByExerciseId(exerciseId: number) {
    const result = await this.prisma.$queryRaw`
    SELECT
      tr.id,
      ec.name,
      tr.date,
      tr.weight,
      tr.count
    FROM training_records as tr
    INNER JOIN exercise_categories as ec
    ON ec.id = tr.exercise_id
    WHERE tr.exercise_id = ${exerciseId}
    ORDER BY tr.date DESC;
    `;
    return result;
  }

  async findById(id: number) {
    const result = await this.prisma.$queryRaw<TrainingData[]>`
    SELECT
      tr.id,
      ec.target_id,
      tr.exercise_id,
      tr.date,
      tr.weight,
      tr.count
    FROM training_records as tr
    INNER JOIN exercise_categories as ec
    ON ec.id = tr.exercise_id
    WHERE tr.id = ${id}
    `;
    return result[0];
  }

  async findByDate(date: string) {
    const result = await this.prisma.$queryRaw`
      SELECT
        tr.id,
        ec.name,
        tr.date,
        tr.weight,
        tr.count
      FROM training_records AS tr
      INNER JOIN exercise_categories AS ec
      ON tr.exercise_id = ec.id
      WHERE tr.date = ${date}::DATE;
      `;
    return result;
  }

  async create(createTrainingRecordDto: CreateTrainingRecordDto) {
    const currentJstTime = formatInTimeZone(
      new Date(),
      'Asia/Tokyo',
      'yyyy-MM-dd HH:mm:ss.sss',
    );

    const training = await this.prisma.$executeRaw`
        INSERT INTO training_records (exercise_id,weight,date,count,create_date,update_date) VALUES
        (
        ${createTrainingRecordDto.exercise_id},
        ${createTrainingRecordDto.weight},
        ${new Date(createTrainingRecordDto.date)},
        ${createTrainingRecordDto.count},
        ${currentJstTime}::timestamp,
        ${currentJstTime}::timestamp
        );
        `;
    return training;
  }

  async update(id: number, createTrainingRecordDto: CreateTrainingRecordDto) {
    const currentJstTime = formatInTimeZone(
      new Date(),
      'Asia/Tokyo',
      'yyyy-MM-dd HH:mm:ss.sss',
    );
    const updateResult = await this.prisma.$executeRaw`
      UPDATE training_records SET
      exercise_id = ${createTrainingRecordDto.exercise_id},
      date = ${new Date(createTrainingRecordDto.date)},
      weight =${createTrainingRecordDto.weight},
      count = ${createTrainingRecordDto.count},
      update_date = ${currentJstTime}::timestamp
      WHERE id = ${id};
    `;
    return updateResult;
  }

  async delete(id: number) {
    await this.prisma.$executeRaw`
    DELETE FROM training_records WHERE id = ${id};
    `;
    return;
  }
}
