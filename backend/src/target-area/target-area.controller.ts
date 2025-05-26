import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TargetAreaService } from './target-area.service';

@Controller('target-area')
export class TargetAreaController {
  constructor(private readonly targetAreaService: TargetAreaService) {}

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.targetAreaService.findById(id);
  }
}
