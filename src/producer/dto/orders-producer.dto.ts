import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProducerDto {
  @ApiProperty({ example: 'asc', description: 'Ordem do CPF', required: false })
  @IsOptional()
  cpf?: 'asc' | 'desc';

  @ApiProperty({ example: 'desc', description: 'Ordem do nome', required: false })
  @IsOptional()
  name?: 'asc' | 'desc';

  @ApiProperty({ example: 'asc', description: 'Ordem da cidade', required: false })
  @IsOptional()
  city?: 'asc' | 'desc';

  @ApiProperty({ example: 'desc', description: 'Ordem do estado', required: false })
  @IsOptional()
  state?: 'asc' | 'desc';

  @ApiProperty({ example: 'asc', description: 'Ordem da data de criação', required: false })
  @IsOptional()
  createdAt?: 'asc' | 'desc';

  @ApiProperty({ example: 'desc', description: 'Ordem da data de atualização', required: false })
  @IsOptional()
  updatedAt?: 'asc' | 'desc';

  @ApiProperty({ example: 'asc', description: 'Ordem da data de exclusão', required: false })
  @IsOptional()
  deletedAt?: 'asc' | 'desc';
}
