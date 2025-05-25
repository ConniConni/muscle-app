import { Test, TestingModule } from '@nestjs/testing';
import { TrainingRecordController } from './training_record.controller';
import { TrainingRecordService } from './training_record.service';

describe('MuscleController', () => {
  let controller: TrainingRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingRecordController],
      providers: [TrainingRecordService],
    }).compile();

    controller = module.get<TrainingRecordController>(TrainingRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
