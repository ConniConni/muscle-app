import { Test, TestingModule } from '@nestjs/testing';
import { TrainingRecordService } from './training_record.service';

describe('TrainingRecordService', () => {
  let service: TrainingRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingRecordService],
    }).compile();

    service = module.get<TrainingRecordService>(TrainingRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
