import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExerciseCategoryDto } from './dto/exercise-category.dto';
import { formatInTimeZone } from 'date-fns-tz';

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
    const currentJstTime = formatInTimeZone(
      new Date(),
      'Asia/Tokyo',
      'yyyy-MM-dd HH:mm:ss.sss',
    );
    const result = await this.prisma.$executeRaw`
      INSERT INTO exercise_categories (target_id, name, create_date, update_date)
      VALUES (
        ${exerciseCategoryDto.target_id},
        ${exerciseCategoryDto.name},
        ${currentJstTime}::timestamp,
        ${currentJstTime}::timestamp
      )
      `;
  }
}
