import { Test, TestingModule } from '@nestjs/testing';
import { MstMuscleCategoryService } from './mst-muscle-category.service';

describe('MstMuscleCategoryService', () => {
  let service: MstMuscleCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MstMuscleCategoryService],
    }).compile();

    service = module.get<MstMuscleCategoryService>(MstMuscleCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
