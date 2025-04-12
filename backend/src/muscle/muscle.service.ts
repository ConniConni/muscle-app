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

  async find(trainingId: number) {
    const user = await this.prisma.muscle_training.findUnique({
      where: {
        id: trainingId,
      },
    });
  }

  async create(createMuscleDto: CreateMuscleDto) {
    const user = await this.prisma.muscle_training.create({
      data: {
        category_id: createMuscleDto.category_id,
        date: new Date(createMuscleDto.date),
        count: createMuscleDto.count,
      },
    });
    return user;
  }
}
