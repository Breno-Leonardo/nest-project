import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderProducerDto } from 'src/producer/dto/orders-producer.dto';
import { CreateCropsPlantedDto } from './dto/create-crops.dto';
import { FiltersCropsPlantedDto } from './dto/filters-crops.dto';
import { UpdateCropsPlantedDto } from './dto/update-crops.dto';

@Injectable()
export class CropsPlantedRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.cropsPlanted.findUnique({
      where: { id: id },
      include: {},
    });
  }

  async createCropsPlanted(body: CreateCropsPlantedDto) {
    return await this.prisma.cropsPlanted.create({ data: body });
  }

  async filterCropsPlanted(
    filters: FiltersCropsPlantedDto,
    limit: number,
    skip: number,
    orders: OrderProducerDto,
  ) {
    const data = await this.prisma.cropsPlanted.findMany({
      skip: skip,
      take: limit,
      where: { ...filters },
      include: {},
      orderBy: { ...orders },
    });
    const total = await this.prisma.cropsPlanted.count({
      where: { ...filters },
    });

    const totalPags = Math.ceil(total / limit);
    return { data, total, totalPags };
  }

  async deleteCropsPlanted(id: string) {
    return await this.prisma.cropsPlanted.delete({
      where: { id: id },
    });
  }

  async updateCropsPlanted(id: string, update: UpdateCropsPlantedDto) {
    return this.prisma.cropsPlanted.update({
      where: { id: id },
      data: { ...update },
    });
  }
}
