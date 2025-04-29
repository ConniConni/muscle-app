import { Controller, Get } from '@nestjs/common';
import { MstService } from './mst.service';

@Controller('mst')
export class MstController {
  constructor(private readonly mstService: MstService) {}

  @Get()
  findAll() {
    return this.mstService.findAll();
  }
}
