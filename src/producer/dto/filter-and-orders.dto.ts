import { IsNotEmpty, IsOptional } from 'class-validator';
import { FiltersProducerDto } from './filters-producer.dto';
import { OrderProducerDto } from './orders-producer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FiltersAndOrdersProducerDto {
  @ApiProperty()
  @IsNotEmpty()
  filters: FiltersProducerDto;

  @ApiProperty()
  @IsOptional()
  orders?: OrderProducerDto;
}
