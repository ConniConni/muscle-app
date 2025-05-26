import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TargetAreaService } from './target-area.service';

@Controller('target-area')
export class TargetAreaController {
  constructor(private readonly targetAreaService: TargetAreaService) {}

  @Get()
  async findAll() {
    return await this.targetAreaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.targetAreaService.findById(id);
  }
}
