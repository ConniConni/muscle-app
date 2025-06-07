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
import { TrainingRecordDto } from './dto/get-training-record.dto';

@Controller('training-record')
export class TrainingRecordController {
  constructor(private readonly trainingRecordService: TrainingRecordService) {}

  @Get()
  async findAll(@Query() trainingRecordDto: TrainingRecordDto) {
    return await this.trainingRecordService.findAll(trainingRecordDto);
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
