import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MstService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.mst_muscle_category.findMany();
    return users;
  }
}
