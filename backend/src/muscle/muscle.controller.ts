import { Controller, Post, Body } from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Post()
  async create(@Body() createMuscleDto: CreateMuscleDto) {
    return await this.muscleService.create(createMuscleDto);
  }
}
