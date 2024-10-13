import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class FiltersProducerDto {
  @ApiProperty({
    example: '12345678901',
    description: 'CPF do produtor',
    required: false,
  })
  @IsNotEmpty()
  @MaxLength(11)
  cpf?: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do produtor',
    required: false,
  })
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do produtor',
    required: false,
  })
  @IsNotEmpty()
  @MaxLength(255)
  city?: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado do produtor',
    required: false,
  })
  @IsNotEmpty()
  @MaxLength(255)
  state?: string;

  @ApiProperty({
    example: '10',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty({
    example: '1',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;
}
