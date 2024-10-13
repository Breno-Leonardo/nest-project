import { Injectable, NotFoundException } from '@nestjs/common';
import { validatePaginationParams } from '../utils/utils';
import { CropsPlantedRepository } from './crops-planted.repository';
import { CreateCropsPlantedDto } from './dto/create-crops.dto';
import { FiltersAndOrdersCropsPlantedDto } from './dto/filter-and-orders.dto';
import { ResponseCropsPlantedDto } from './dto/response-crops.dto';
import { UpdateCropsPlantedDto } from './dto/update-crops.dto';

@Injectable()
export class CropsPlantedService {
  constructor(private cropsPlantedRepository: CropsPlantedRepository) {}

  async getById(id: string) {
    const cropsPlanted = await this.cropsPlantedRepository.getById(id);
    if (cropsPlanted == null)
      throw new NotFoundException('Not Found CropsPlanted with id ' + id);
    else return new ResponseCropsPlantedDto(cropsPlanted);
  }

  async createCropsPlanted(body: CreateCropsPlantedDto) {
    return await this.cropsPlantedRepository.createCropsPlanted(body);
  }

  async deleteCropsPlanted(id: string) {
    await this.getById(id);
    const result = await this.cropsPlantedRepository.deleteCropsPlanted(id);
    if (result) {
      return {
        status: 'success',
        message: `Successfully removed!`,
      };
    }
    return result;
  }

  async filterCropsPlanted(query: FiltersAndOrdersCropsPlantedDto) {
    const filters = query.filters;
    const orders = query.orders;
    validatePaginationParams(filters.limit, filters.page);
    let page = filters.page;
    let limit = filters.limit;
    limit = typeof limit === 'string' ? parseInt(limit, 10) : limit;
    page = typeof page === 'string' ? parseInt(page, 10) : page;
    const skip = (page - 1) * limit;
    delete filters.limit;
    delete filters.page;

    const result = await this.cropsPlantedRepository.filterCropsPlanted(
      filters,
      limit,
      skip,
      orders,
    );
    const data = [];
    result.data.map((element) => {
      data.push(new ResponseCropsPlantedDto(element));
    });
    return { ...result, data };
  }

  async updateCropsPlanted(id: string, update: UpdateCropsPlantedDto) {
    await this.getById(id);
    return await this.cropsPlantedRepository.updateCropsPlanted(id, update);
  }
}
