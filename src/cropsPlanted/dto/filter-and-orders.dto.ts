import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderCropsPlantedDto } from './order-crops-planted.dto';
import { FiltersCropsPlantedDto } from './filters-crops.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FiltersAndOrdersCropsPlantedDto {
  @ApiProperty()
  @IsNotEmpty()
  filters: FiltersCropsPlantedDto;

  @ApiProperty()
  @IsOptional()
  orders?: OrderCropsPlantedDto;
}
