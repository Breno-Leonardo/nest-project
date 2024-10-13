import { ApiProperty } from '@nestjs/swagger';

export class ResponseCropsPlantedDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  farmId: string;

  @ApiProperty({ example: 'Milho' })
  crop: string;

  constructor(cropsPlanted) {
    this.id = cropsPlanted.id;
    this.farmId = cropsPlanted.farmId;
    this.crop = cropsPlanted.crop;
  }
}
