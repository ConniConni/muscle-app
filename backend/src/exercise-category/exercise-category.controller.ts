import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExerciseCategoryService } from './exercise-category.service';
import { ExerciseCategoryDto } from './dto/exercise-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('exercise-category')
export class ExerciseCategoryController {
  constructor(
    private readonly exerciseCategoryService: ExerciseCategoryService,
  ) {}

  @Post()
  async create(@Body() exerciseCategoryDto: ExerciseCategoryDto) {
    return await this.exerciseCategoryService.create(exerciseCategoryDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.exerciseCategoryService.findAll();
  }

  @Get('with-target')
  async findAlWithTarget() {
    return await this.exerciseCategoryService.findAllWithTarget();
  }

  @Get('target/:target_id')
  async findAllByTargetId(@Param('target_id', ParseIntPipe) targetId: number) {
    return await this.exerciseCategoryService.findAllByTargetId(targetId);
  }
}
