import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TargetAreaService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const result = await this.prisma.$queryRaw`
        SELECT id, name
        FROM target_areas
        WHERE id = ${id}
        ORDER BY id ASC;
    `;
    return result;
  }
}
