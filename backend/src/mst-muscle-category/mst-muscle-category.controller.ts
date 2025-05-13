import { Controller, Get } from '@nestjs/common';
import { MstMuscleCategoryService } from './mst-muscle-category.service';

@Controller('mst-muscle-category')
export class MstMuscleCategoryController {
  constructor(
    private readonly mstMuscleCategoryService: MstMuscleCategoryService,
  ) {}

  @Get()
  async findAll() {
    return await this.mstMuscleCategoryService.findAll();
  }
}
