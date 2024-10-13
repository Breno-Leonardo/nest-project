import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CropsPlantedService } from './crops-planted.service';
import { CreateCropsPlantedDto } from './dto/create-crops.dto';
import { FiltersAndOrdersCropsPlantedDto } from './dto/filter-and-orders.dto';
import { ResponseCropsPlantedDto } from './dto/response-crops.dto';
import { UpdateCropsPlantedDto } from './dto/update-crops.dto';

@ApiTags('CropsPlanted')
@Controller('crops-planted')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CropsPlantedController {
  constructor(public service: CropsPlantedService) {}

  @ApiResponse({ type: ResponseCropsPlantedDto })
  @Get('get/:id')
  async get(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @ApiQuery({ type: FiltersAndOrdersCropsPlantedDto })
  @ApiResponse({ type: ResponseCropsPlantedDto, isArray: true })
  @Get('filter')
  async filter(@Query() query: FiltersAndOrdersCropsPlantedDto) {
    return this.service.filterCropsPlanted(query);
  }

  @Post('create')
  async createCropsPlanted(@Body() body: CreateCropsPlantedDto) {
    return this.service.createCropsPlanted(body);
  }

  @Patch('update/:id')
  async updateCropsPlanted(
    @Param('id') id: string,
    @Body() update: UpdateCropsPlantedDto,
  ) {
    return this.service.updateCropsPlanted(id, update);
  }

  @Delete('delete/:id')
  async deleteCropsPlanted(@Param('id') id: string) {
    return this.service.deleteCropsPlanted(id);
  }
}
