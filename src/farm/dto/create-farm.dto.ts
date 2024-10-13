import { IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @MaxLength(255)
  producerId: string;

  @ApiProperty({ example: '12.345.678/0001-99' })
  @IsNotEmpty()
  @MaxLength(14)
  cnpj: string;

  @ApiProperty({ example: 'Fazenda Boa Vista' })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Alagoinhas' })
  @IsNotEmpty()
  @MaxLength(255)
  city: string;

  @ApiProperty({ example: 'BA' })
  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  totalArea: number;

  @ApiProperty({ example: 7 })
  @IsNotEmpty()
  @IsNumber()
  agriculturalArea: number;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  vegetationArea: number;
}
