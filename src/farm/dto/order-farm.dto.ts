import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderFarmDto {
  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  producerId?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  cnpj?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  name?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  city?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  state?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  totalArea?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  agriculturalArea?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  vegetationArea?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  createdAt?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  updatedAt?: 'asc' | 'desc';

  @ApiProperty({ enum: ['asc', 'desc'], required: false })
  @IsOptional()
  deletedAt?: 'asc' | 'desc';
}
