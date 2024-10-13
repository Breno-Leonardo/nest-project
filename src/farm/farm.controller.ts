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
import { CreateFarmDto } from './dto/create-farm.dto';
import { FiltersAndOrdersFarmDto } from './dto/filter-and-orders.dto';
import { ResponseFarmDto } from './dto/response-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmService } from './farm.service';
import { FarmStatisticsDto } from './dto/response-stats';

@ApiTags('Farm')
@Controller('farm')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class FarmController {
  constructor(public service: FarmService) {}

  @ApiResponse({ type: ResponseFarmDto })
  @Get('get/:id')
  async get(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiResponse({ type: ResponseFarmDto , isArray:true})
  @ApiQuery({type:FiltersAndOrdersFarmDto})
  @Get('filter')
  async filter(@Query() query: FiltersAndOrdersFarmDto) {
    return this.service.filterFarm(query);
  }

  @ApiResponse({type:FarmStatisticsDto})
  @Get('statistics')
  async getFarmStatistics() {
    return await this.service.getFarmStatistics();
  }
  
  @ApiBody({type: CreateFarmDto})
  @Post('create')
  async createFarm(@Body() body: CreateFarmDto) {
    return this.service.createFarm(body);
  }

  @ApiBody({type: UpdateFarmDto})
  @Patch('update/:id')
  async updateFarm(
    @Param('id') id: string,
    @Body() update: UpdateFarmDto,
  ) {
    return this.service.updateFarm(id, update);
  }

  @Delete('delete/:id')
  async deleteFarm(@Param('id') id: string) {
    return this.service.deleteFarm(id);
  }
}
