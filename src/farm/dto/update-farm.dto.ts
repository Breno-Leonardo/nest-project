import { ApiProperty } from '@nestjs/swagger';

export class UpdateFarmDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  producerId?: string;

  @ApiProperty({ example: '12345678000199', required: false })
  cnpj?: string;

  @ApiProperty({ example: 'Fazenda Boa Vista', required: false })
  name?: string;

  @ApiProperty({ example: 'Alagoinhas', required: false })
  city?: string;

  @ApiProperty({ example: 'BA', required: false })
  state?: string;

  @ApiProperty({ example: 10, required: false })
  totalArea?: number;

  @ApiProperty({ example: 7, required: false })
  agriculturalArea?: number;

  @ApiProperty({ example: 3, required: false })
  vegetationArea?: number;
}
