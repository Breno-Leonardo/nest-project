import { ApiProperty } from '@nestjs/swagger';
import { ResponseFarmDto } from 'src/farm/dto/response-farm.dto';

export class ResponseProducerDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '12345678900' })
  cpf: string;

  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @ApiProperty({ example: 'Alagoinhas' })
  city: string;

  @ApiProperty({ example: 'Bahia' })
  state: string;

  // @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  // createdAt: string;

  // @ApiProperty({ example: '2023-01-02T00:00:00Z' })
  // updatedAt: string;

  // @ApiProperty({ example: null, nullable: true })
  // deletedAt?: string | null;

  constructor(producer) {
    this.id = producer.id;
    this.cpf = producer.cpf;
    this.name = producer.name;
    this.city = producer.city;
    this.state = producer.state;
    // this.createdAt = producer.createdAt;
    // this.updatedAt = producer.updatedAt;
    // this.deletedAt = producer.deletedAt;
  }
}
