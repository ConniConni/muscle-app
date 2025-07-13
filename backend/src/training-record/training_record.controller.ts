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
  UseGuards,
  Req,
} from '@nestjs/common';
import { TrainingRecordService } from './training_record.service';
import { CreateTrainingRecordDto } from './dto/create-training-record.dto';
import { TrainingRecordDto } from './dto/get-training-record.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('training-record')
@UseGuards(AuthGuard)
export class TrainingRecordController {
  constructor(private readonly trainingRecordService: TrainingRecordService) {}

  @Get()
  async findAll(
    @Query() trainingRecordDto: TrainingRecordDto,
    @Req() req: any,
  ) {
    return await this.trainingRecordService.findAll(
      trainingRecordDto,
      req.user.id,
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return await this.trainingRecordService.findById(id, req.user.id);
  }

  @Post()
  async create(
    @Body() createTrainingRecordDto: CreateTrainingRecordDto,
    @Req() req: any,
  ) {
    return await this.trainingRecordService.create(
      createTrainingRecordDto,
      req.user.id,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTrainingRecordDto: CreateTrainingRecordDto,
    @Req() req: any,
  ) {
    return await this.trainingRecordService.update(
      id,
      createTrainingRecordDto,
      req.user.id,
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return await this.trainingRecordService.delete(id, req.user.id);
  }
}
