import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FarmController } from './farm.controller';
import { FarmService } from './farm.service';
import { FarmRepository } from './farm.repository';

@Module({
  controllers: [FarmController],
  providers: [PrismaService, FarmService, FarmRepository],
  exports: [FarmService],
})
export class FarmModule {}
