import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCropsPlantedDto {
  @ApiProperty({ title: 'Farm ID Order', example: 'asc', description: 'Ordem do ID da fazenda', required: false, type: String })
  @IsOptional()
  farmId?: 'asc' | 'desc';

  @ApiProperty({ title: 'Crop Order', example: 'desc', description: 'Ordem da cultura plantada', required: false, type: String })
  @IsOptional()
  crop?: 'asc' | 'desc';

  @ApiProperty({ title: 'Created At Order', example: 'asc', description: 'Ordem da data de criação', required: false, type: String })
  @IsOptional()
  createdAt?: 'asc' | 'desc';
}
