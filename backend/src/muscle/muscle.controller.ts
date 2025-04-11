import { Controller, Get, Post, Body } from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Get()
  async findAll() {
    return await this.muscleService.findAll();
  }

  @Post()
  async create(@Body() createMuscleDto: CreateMuscleDto) {
    return await this.muscleService.create(createMuscleDto);
  }
}
