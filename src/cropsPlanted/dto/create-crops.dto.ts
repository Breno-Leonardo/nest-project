import { CROPS } from '@prisma/client';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropsPlantedDto {
  @ApiProperty({ example: '12345', description: 'ID da fazenda', required: true, type: String })
  @IsNotEmpty()
  @MaxLength(255)
  farmId: string;

  @ApiProperty({ example: 'CORN', description: 'Tipo de cultura plantada', required: true, enum: CROPS })
  @IsNotEmpty()
  @IsEnum(CROPS)
  crop: CROPS;
}
