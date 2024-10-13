import { IsNotEmpty, IsOptional } from 'class-validator';
import { FiltersFarmDto } from './filters-farm.dto';
import { OrderFarmDto } from './order-farm.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FiltersAndOrdersFarmDto {
  @ApiProperty()
  @IsNotEmpty()
  filters: FiltersFarmDto;

  @ApiPropertyOptional()
  @IsOptional()
  orders?: OrderFarmDto;
}
