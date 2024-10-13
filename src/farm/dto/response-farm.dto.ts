import { ApiProperty } from '@nestjs/swagger';
import { ResponseCropsPlantedDto } from '../../cropsPlanted/dto/response-crops.dto';
import { ResponseProducerDto } from '../../producer/dto/response-producer.dto';

export class ResponseFarmDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ type: ResponseProducerDto })
  producer: ResponseProducerDto;

  @ApiProperty({ example: '12345678000199' })
  cnpj: string;

  @ApiProperty({ example: 'Fazenda Boa Vista' })
  name: string;

  @ApiProperty({ example: 'Alagoinhas' })
  city: string;

  @ApiProperty({ example: 'Bahia' })
  state: string;

  @ApiProperty({ example: 10 })
  totalArea: number;

  @ApiProperty({ example: 7 })
  agriculturalArea: number;

  @ApiProperty({ example: 3 })
  vegetationArea: number;

  // @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  // createdAt: string;

  // @ApiProperty({ example: '2023-01-02T00:00:00Z' })
  // updatedAt: string;

  // @ApiProperty({ example: null, nullable: true })
  // deletedAt?: string | null;

  @ApiProperty({ type: [ResponseCropsPlantedDto] })
  cropsPlanted: ResponseCropsPlantedDto[];

  constructor(farm) {
    this.id = farm.id;
    this.cnpj = farm.cnpj;
    this.name = farm.name;
    this.city = farm.city;
    this.state = farm.state;
    this.totalArea = farm.totalArea;
    this.agriculturalArea = farm.agriculturalArea;
    this.vegetationArea = farm.vegetationArea;
    // this.createdAt = farm.createdAt;
    // this.updatedAt = farm.updatedAt;
    // this.deletedAt = farm.deletedAt;
    if (farm.producer) this.producer = new ResponseProducerDto(farm.producer);
    if (farm.cropsPlanted)
      this.cropsPlanted = farm.cropsPlanted.map(
        (crop) => new ResponseCropsPlantedDto(crop),
      );
  }
}
