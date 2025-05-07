import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MuscleService } from './muscle.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';

@Controller('muscle')
export class MuscleController {
  constructor(private readonly muscleService: MuscleService) {}

  @Get()
  async findAll() {
    return await this.muscleService.findAll();
  }

  @Get('category_id=:category_id')
  async findAllByCategoryId(@Param('category_id') categoryId: number) {
    return await this.muscleService.findAllByCategoryId(categoryId);
  }

  @Post()
  async create(@Body() createMuscleDto: CreateMuscleDto) {
    return await this.muscleService.create(createMuscleDto);
  }

  @Delete('id=:id')
  async delete(@Param('id') id: number) {
    return await this.muscleService.delete(+id);
  }
}
