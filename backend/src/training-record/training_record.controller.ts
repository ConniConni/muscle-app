import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TrainingRecordService } from './training_record.service';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';

@Controller('training-record')
export class TrainingRecordController {
  constructor(private readonly trainingRecordService: TrainingRecordService) {}

  @Get()
  async findAll(@Query('date') date?: string) {
    if (date) {
      return await this.trainingRecordService.findByDate(date);
    }
    return await this.trainingRecordService.findAll();
  }

  @Get('exercise/:exercise_id')
  async findAllByExerciseId(
    @Param('exercise_id', ParseIntPipe) exerciseId: number,
  ) {
    return await this.trainingRecordService.findAllByExerciseId(exerciseId);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.trainingRecordService.findById(id);
  }

  @Post()
  async create(@Body() createTrainingRecordDto: CreateTrainingRecordDto) {
    return await this.trainingRecordService.create(createTrainingRecordDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTrainingRecordDto: CreateTrainingRecordDto,
  ) {
    return await this.trainingRecordService.update(id, createTrainingRecordDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.trainingRecordService.delete(id);
  }
}
