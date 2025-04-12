import { Injectable } from '@nestjs/common';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MuscleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.muscle_training.findMany();
    return users;
  }

  async findOne(trainingId: number) {
    const training = await this.prisma.muscle_training.findMany({
      where: {
        category_id: trainingId,
      },
    });
    return training;
  }

  async create(createMuscleDto: CreateMuscleDto) {
    const training = await this.prisma.muscle_training.create({
      data: {
        category_id: createMuscleDto.category_id,
        date: new Date(createMuscleDto.date),
        count: createMuscleDto.count,
      },
    });
    return training;
  }
}
