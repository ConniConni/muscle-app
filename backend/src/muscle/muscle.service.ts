import { Injectable } from '@nestjs/common';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MuscleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.$queryRaw`
    SELECT
      mt.id,
      mt.date,
      mt.count,
      mmc.name
    FROM muscle_training as mt
    LEFT JOIN
      mst_muscle_category as mmc
    ON mt.category_id = mmc.id
    `;
    return result;
  }

  async findOne(trainingId: number) {
    const result = await this.prisma.$queryRaw`
    SELECT
      mt.id,
      mmt.name,
      -- mt.category_id,
      mt.date,
      mt.count
    FROM muscle_training as mt
    INNER JOIN mst_muscle_category as mmt
    ON mmt.id = mt.category_id
    WHERE mt.category_id = 1;
    `;
    return result;
  }

  async create(createMuscleDto: CreateMuscleDto) {
    const training = await this.prisma.$queryRaw`
        INSERT INTO muscle_training (category_id,date,count) VALUES
        (
        ${createMuscleDto.category_id},
        ${new Date(createMuscleDto.date)},
        ${createMuscleDto.count}
        );
        `;
    return training;
  }
}
