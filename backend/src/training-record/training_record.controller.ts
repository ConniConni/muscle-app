import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TrainingRecordService } from './training_record.service';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';

@Controller('training-record')
export class TrainingRecordController {
  constructor(private readonly trainingRecordService: TrainingRecordService) {}

  @Get()
  async findAll() {
    return await this.trainingRecordService.findAll();
  }

  @Get('exercise/:exercise_id')
  async findAllByCategoryId(@Param('exercise_id') exerciseId: number) {
    return await this.trainingRecordService.findAllByExerciseId(exerciseId);
  }

  @Get('id/:id')
  async findAllById(@Param('id') id: number) {
    return await this.trainingRecordService.findAllById(id);
  }

  @Post()
  async create(@Body() createTrainingRecordDto: CreateTrainingRecordDto) {
    return await this.trainingRecordService.create(createTrainingRecordDto);
  }

  @Patch('id/:id')
  async update(
    @Param('id') id: number,
    @Body() createTrainingRecordDto: CreateTrainingRecordDto,
  ) {
    return await this.trainingRecordService.update(
      +id,
      createTrainingRecordDto,
    );
  }

  @Delete('id/:id')
  async delete(@Param('id') id: number) {
    return await this.trainingRecordService.delete(+id);
  }
}
