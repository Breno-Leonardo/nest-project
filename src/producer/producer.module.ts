import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProducerController } from './producer.controller';
import { ProducerRepository } from './producer.repository';
import { ProducerService } from './producer.service';

@Module({
  controllers: [ProducerController],
  providers: [PrismaService, ProducerService, ProducerRepository],
  exports: [ProducerService],
})
export class ProducerModule {}
