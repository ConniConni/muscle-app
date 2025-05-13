import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MstMuscleCategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const result = await this.prisma.$queryRaw`
      SELECT
        mmc.id,
        mmc.name
      FROM mst_muscle_category as mmc
      ORDER BY mmc.id ASC;
      `;
    return result;
  }
}
