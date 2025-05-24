import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExerciseCategoryDto } from './dto/exercise-category.dto';

@Injectable()
export class ExerciseCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.$queryRaw`
      SELECT
        ec.id,
        ec.name
      FROM exercise_categories as ec
      ORDER BY ec.id ASC;
      `;
    return result;
  }

  async create(exerciseCategoryDto: ExerciseCategoryDto) {
    const result = await this.prisma.$executeRaw`
      INSERT INTO exercise_categories (target_id, name)
      VALUES (
        ${exerciseCategoryDto.target_id},
        ${exerciseCategoryDto.name}
      )
      `;
  }
}
