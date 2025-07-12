import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TargetAreaService } from './target-area.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('target-area')
@UseGuards(AuthGuard)
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
