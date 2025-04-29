import { Test, TestingModule } from '@nestjs/testing';
import { MstService } from './mst.service';

describe('MstService', () => {
  let service: MstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MstService],
    }).compile();

    service = module.get<MstService>(MstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
