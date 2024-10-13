import { ApiProperty } from '@nestjs/swagger';

class FarmByStateDto {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 'Paraná' })
  state: string;
}

class FarmByCultureDto {
  @ApiProperty({ example: 4 })
  count: number;

  @ApiProperty({ example: 'COFFEE' })
  crop: string;
}

class LandUseDto {
  @ApiProperty({ example: 18900 })
  agriculturalArea: number;

  @ApiProperty({ example: 4500 })
  vegetationArea: number;
}

export class FarmStatisticsDto {
  @ApiProperty({ example: 10 })
  totalFarms: number;

  @ApiProperty({ example: 23400 })
  totalArea: number;

  @ApiProperty({ type: [FarmByStateDto] })
  farmsByState: FarmByStateDto[];

  @ApiProperty({ type: [FarmByCultureDto] })
  farmsByCulture: FarmByCultureDto[];

  @ApiProperty({ type: LandUseDto })
  landUse: LandUseDto;
}
