import { Test, TestingModule } from '@nestjs/testing';
import { MstMuscleCategoryController } from './mst-muscle-category.controller';
import { MstMuscleCategoryService } from './mst-muscle-category.service';

describe('MstMuscleCategoryController', () => {
  let controller: MstMuscleCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MstMuscleCategoryController],
      providers: [MstMuscleCategoryService],
    }).compile();

    controller = module.get<MstMuscleCategoryController>(MstMuscleCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
