import { ApiProperty } from '@nestjs/swagger';
import { CROPS } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class FiltersCropsPlantedDto {
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

  @ApiProperty({ example: 10, required: true })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  page: number;
}
