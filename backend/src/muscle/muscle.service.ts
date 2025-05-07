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

  async findAllByCategoryId(categoryId: number) {
    const result = await this.prisma.$queryRaw`
    SELECT
      mt.id,
      mmt.name,
      mt.date,
      mt.count
    FROM muscle_training as mt
    INNER JOIN mst_muscle_category as mmt
    ON mmt.id = mt.category_id
    WHERE mt.category_id = ${+categoryId};
    `;
    return result;
  }

  async create(createMuscleDto: CreateMuscleDto) {
    const training = await this.prisma.$executeRaw`
        INSERT INTO muscle_training (category_id,date,count) VALUES
        (
        ${createMuscleDto.category_id},
        ${new Date(createMuscleDto.date)},
        ${createMuscleDto.count}
        );
        `;
    return training;
  }

  async delete(categoryId: number) {
    const result = await this.prisma.$executeRaw`
    DELETE FROM muscle_training WHERE category_id = ${categoryId};
    `;
    return;
  }
}
