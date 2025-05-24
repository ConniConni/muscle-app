import { Injectable } from '@nestjs/common';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';
import { PrismaService } from 'src/prisma.service';
import { TrainingData } from 'src/types';

@Injectable()
export class TrainingRecordService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.$queryRaw`
    SELECT
      tr.id,
      tr.date,
      tr.weight,
      tr.count,
      ec.name
    FROM training_records as tr
    LEFT JOIN
      exercise_categories as ec
    ON tr.exercise_id = ec.id
    ORDER BY tr.date;
    `;
    return result;
  }

  async findAllByExerciseId(exerciseId: number) {
    const result = await this.prisma.$queryRaw`
    SELECT
      tr.id,
      ec.name,
      tr.date,
      tr.count
    FROM training_records as tr
    INNER JOIN exercise_categories as ec
    ON ec.id = tr.exercise_id
    WHERE tr.exercise_id = ${+exerciseId}
    ORDER BY tr.date;
    `;
    return result;
  }

  async findAllById(id: number) {
    const result = await this.prisma.$queryRaw<TrainingData[]>`
    SELECT
      tr.id,
      tr.exercise_id,
      tr.date,
      tr.weight,
      tr.count
    FROM training_records as tr
    WHERE tr.id = ${+id}
    `;
    return result[0];
  }

  async create(createTrainingRecordDto: CreateTrainingRecordDto) {
    const training = await this.prisma.$executeRaw`
        INSERT INTO training_records (exercise_id,weight,date,count) VALUES
        (
        ${createTrainingRecordDto.exercise_id},
        ${createTrainingRecordDto.weight},
        ${new Date(createTrainingRecordDto.date)},
        ${createTrainingRecordDto.count}
        );
        `;
    return training;
  }

  async update(id: number, createTrainingRecordDto: CreateTrainingRecordDto) {
    const updateResult = await this.prisma.$executeRaw`
      UPDATE training_records SET
      exercise_id = ${createTrainingRecordDto.exercise_id},
      date = ${new Date(createTrainingRecordDto.date)},
      count = ${createTrainingRecordDto.count}
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
