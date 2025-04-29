import { Test, TestingModule } from '@nestjs/testing';
import { MstController } from './mst.controller';
import { MstService } from './mst.service';

describe('MstController', () => {
  let controller: MstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MstController],
      providers: [MstService],
    }).compile();

    controller = module.get<MstController>(MstController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
