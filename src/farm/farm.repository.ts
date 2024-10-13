import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FiltersFarmDto } from './dto/filters-farm.dto';
import { OrderFarmDto } from './dto/order-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.farm.findUnique({
      where: { id: id, deletedAt: null },
      include: { producer: true,cropsPlanted: true },
    });
  }

  async createFarm(body: CreateFarmDto) {
    return await this.prisma.farm.create({ data: body });
  }

  async filterFarm(
    filters: FiltersFarmDto,
    limit: number,
    skip: number,
    orders: OrderFarmDto,
  ) {
    const data = await this.prisma.farm.findMany({
      skip: skip,
      take: limit,
      where: { ...filters },
      include: { producer: true, cropsPlanted: true },
      orderBy: { ...orders },
    });
    const total = await this.prisma.farm.count({
      where: { ...filters },
    });

    const totalPags = Math.ceil(total / limit);
    return { data, total, totalPags };
  }

  async deleteFarm(id: string) {
    return await this.prisma.farm.update({
      where: { id: id },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  }

  async updateFarm(id: string, update: UpdateFarmDto) {
    return this.prisma.farm.update({
      where: { id: id },
      data: { ...update },
    });
  }

  async getTotalFarms() {
    return await this.prisma.farm.count();
  }

  async getTotalArea() {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        totalArea: true,
      },
    });
    return result._sum.totalArea;
  }

  async getFarmsByState() {
    const result = await this.prisma.farm.groupBy({
      by: ['state'],
      _count: {
        id: true,
      },
    });
    const data = [];
    result.map((element) => {
      data.push({ count: element._count.id, state: element.state });
    });
    return data;
  }

  async getFarmsByCulture() {
    const result = await this.prisma.cropsPlanted.groupBy({
      by: ['crop'],
      _count: {
        id: true,
      },
    });
    const data = [];
    result.map((element) => {
      data.push({ count: element._count.id, crop: element.crop });
    });
    return data;
  }

  async getLandUse() {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });
    return {
      agriculturalArea: result._sum.agriculturalArea,
      vegetationArea: result._sum.vegetationArea,
    };
  }
}
