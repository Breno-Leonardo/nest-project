import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CropsPlantedController } from './crops-planted.controller';
import { CropsPlantedService } from './crops-planted.service';
import { CropsPlantedRepository } from './crops-planted.repository';

@Module({
  controllers: [CropsPlantedController],
  providers: [PrismaService, CropsPlantedService, CropsPlantedRepository],
  exports: [CropsPlantedService],
})
export class CropsPlantedModule {}
