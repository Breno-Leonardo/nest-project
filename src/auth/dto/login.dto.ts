import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'adm',  required: true })
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'adm',  required: true })
  @IsNotEmpty()
  password: string;
}
