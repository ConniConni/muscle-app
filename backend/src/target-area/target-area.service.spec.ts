import { Test, TestingModule } from '@nestjs/testing';
import { TargetAreaService } from './target-area.service';

describe('TargetAreaService', () => {
  let service: TargetAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TargetAreaService],
    }).compile();

    service = module.get<TargetAreaService>(TargetAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
