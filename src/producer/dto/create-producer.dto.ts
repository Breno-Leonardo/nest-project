import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({ example: '12345678901', description: 'CPF do produtor', required: true })
  @IsNotEmpty()
  @MaxLength(11)
  cpf: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome do produtor', required: true })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade do produtor', required: true })
  @IsNotEmpty()
  @MaxLength(255)
  city: string;

  @ApiProperty({ example: 'SP', description: 'Estado do produtor', required: true })
  @IsNotEmpty()
  @MaxLength(255)
  state: string;
}
