import { Body, Controller, Get, Post } from '@nestjs/common';
import { MstMuscleCategoryService } from './mst-muscle-category.service';
import { CreateMstMuscleCategoryDto } from './dto/create-mst-muscle-category.dto';

@Controller('mst-muscle-category')
export class MstMuscleCategoryController {
  constructor(
    private readonly mstMuscleCategoryService: MstMuscleCategoryService,
  ) {}

  @Post()
  async create(@Body() createMstMuscleCategoryDto: CreateMstMuscleCategoryDto) {
    return await this.mstMuscleCategoryService.create(
      createMstMuscleCategoryDto,
    );
  }
  @Get()
  async findAll() {
    return await this.mstMuscleCategoryService.findAll();
  }
}
