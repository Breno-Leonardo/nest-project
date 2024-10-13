import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProducerModule } from './producer/producer.module';
import { AuthModule } from './auth/auth.module';
import { CropsPlantedModule } from './cropsPlanted/crops-planted.module';
import { FarmModule } from './farm/farm.module';

@Module({
  imports: [ProducerModule, AuthModule, CropsPlantedModule,FarmModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
