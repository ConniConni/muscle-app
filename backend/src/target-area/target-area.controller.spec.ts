import { Test, TestingModule } from '@nestjs/testing';
import { TargetAreaController } from './target-area.controller';
import { TargetAreaService } from './target-area.service';

describe('TargetAreaController', () => {
  let controller: TargetAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TargetAreaController],
      providers: [TargetAreaService],
    }).compile();

    controller = module.get<TargetAreaController>(TargetAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
