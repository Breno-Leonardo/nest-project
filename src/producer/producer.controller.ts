import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ResponseProducerDto } from './dto/response-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerService } from './producer.service';
import { FiltersProducerDto } from './dto/filters-producer.dto';
import { FiltersAndOrdersProducerDto } from './dto/filter-and-orders.dto';

@ApiTags('Producer')
@Controller('producer')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProducerController {
  constructor(public service: ProducerService) {}

  @ApiResponse({ type: ResponseProducerDto })
  @Get('get/:id')
  async get(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiResponse({ type: ResponseProducerDto, isArray:true })
  @ApiQuery({ type: FiltersAndOrdersProducerDto})
  @Get('filter')
  async filter(@Query() query: FiltersAndOrdersProducerDto) {
    return this.service.filterProducer(query);
  }

  @ApiBody({type:CreateProducerDto})
  @Post('create')
  async createProducer(@Body() body: CreateProducerDto) {
    return this.service.createProducer(body);
  }

  @ApiBody({type:UpdateProducerDto})
  @Patch('update/:id')
  async UpdateProducerDto(
    @Param('id') id: string,
    @Body() update: UpdateProducerDto,
  ) {
    return this.service.updateProducer(id, update);
  }

  @Delete('delete/:id')
  async deleteDepartment(@Param('id') id: string) {
    return this.service.deleteProducer(id);
  }

}
