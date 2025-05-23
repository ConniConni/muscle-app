import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMstMuscleCategoryDto } from './dto/create-mst-muscle-category.dto';

@Injectable()
export class MstMuscleCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.$queryRaw`
      SELECT
        mmc.id,
        mmc.name
      FROM mst_muscle_categories as mmc
      ORDER BY mmc.id ASC;
      `;
    return result;
  }

  async create(mstMuscleCategoryDto: CreateMstMuscleCategoryDto) {
    const result = await this.prisma.$executeRaw`
    INSERT INTO mst_muscle_categories (name) VALUES (
    ${mstMuscleCategoryDto.name}
    )
    `;
  }
}
