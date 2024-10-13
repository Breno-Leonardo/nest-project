import { ApiProperty } from '@nestjs/swagger';
import { CROPS } from '@prisma/client';
import { IsEnum, IsOptional, MaxLength } from 'class-validator';

export class UpdateCropsPlantedDto {
  @ApiProperty({
    example: '12345',
    description: 'ID da fazenda',
    required: true,
    type: String,
  })
  @IsOptional()
  @MaxLength(255)
  farmId?: string;

  @ApiProperty({
    example: 'CORN',
    description: 'Tipo de cultura plantada',
    required: true,
    enum: CROPS,
  })
  @IsOptional()
  @IsEnum(CROPS)
  crop?: CROPS;
}
