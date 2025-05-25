import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExerciseCategoryService } from './exercise-category.service';
import { ExerciseCategoryDto } from './dto/exercise-category.dto';

@Controller('exercise-category')
export class ExerciseCategoryController {
  constructor(
    private readonly exerciseCategoryService: ExerciseCategoryService,
  ) {}

  @Post()
  async create(@Body() exerciseCategoryDto: ExerciseCategoryDto) {
    return await this.exerciseCategoryService.create(exerciseCategoryDto);
  }
  @Get()
  async findAll() {
    return await this.exerciseCategoryService.findAll();
  }
}
