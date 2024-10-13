import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { FiltersProducerDto } from './dto/filters-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { OrderProducerDto } from './dto/orders-producer.dto';

@Injectable()
export class ProducerRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.producer.findUnique({
      where: { id: id, deletedAt: null },
      include: {},
    });
  }

  async createProducer(body: CreateProducerDto) {
    return await this.prisma.producer.create({ data: body });
  }

  async filterProducer(filters: FiltersProducerDto, limit, skip, orders:OrderProducerDto) {
    const data = await this.prisma.producer.findMany({
      skip: skip,
      take: limit,
      where: { ...filters },
      include: {},
      orderBy: { ...orders },
    });
    const total = await this.prisma.producer.count({
      where: { ...filters },
    });

    const totalPags = Math.ceil(total / limit);
    return { data, total, totalPags };
  }

  async deleteProducer(id: string) {
    return await this.prisma.producer.update({
      where: { id: id },
      data: {
        deletedAt: new Date(Date.now()),
      },
    });
  }

  async updateProducer(id: string, update: UpdateProducerDto) {
    return this.prisma.producer.update({
      where: { id: id },
      data: { ...update },
    });
  }
}
