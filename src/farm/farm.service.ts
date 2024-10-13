import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  decrypt,
  encrypt,
  isValidCNPJ,
  validatePaginationParams,
} from '../utils/utils';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FiltersAndOrdersFarmDto } from './dto/filter-and-orders.dto';
import { ResponseFarmDto } from './dto/response-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmRepository } from './farm.repository';

@Injectable()
export class FarmService {
  constructor(private farmRepository: FarmRepository) {}

  async getById(id: string) {
    const farm = await this.farmRepository.getById(id);
    if (farm == null)
      throw new NotFoundException('Not Found Farm with id ' + id);
    farm.cnpj = decrypt(farm.cnpj, process.env.ENCRYPT_KEY);
    return new ResponseFarmDto(farm);
  }

  async createFarm(body: CreateFarmDto) {
    if (!isValidCNPJ(body.cnpj)) {
      throw new BadRequestException('Not Valid CNPJ');
    }
    if (body.agriculturalArea + body.vegetationArea > body.totalArea) {
      throw new NotAcceptableException(
        'The sum of arable area and vegetation cannot be greater than the total area of ​​the farm.',
      );
    }
    const cnpjEncrypt = encrypt(body.cnpj, process.env.ENCRYPT_KEY);
    const result= await this.farmRepository.createFarm({ ...body, cnpj: cnpjEncrypt });
    if (result && result.cnpj) {
      result.cnpj = body.cnpj;
    }
    return result;
  }

  async deleteFarm(id: string) {
    await this.getById(id);
    const result= await this.farmRepository.deleteFarm(id);
    if (result) {
      return {
        status: 'success',
        message: `Successfully removed!`,
      };
    }
    return result;
  }

  async filterFarm(query: FiltersAndOrdersFarmDto) {
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

    if(filters.cnpj){
      filters.cnpj= encrypt(filters.cnpj,process.env.ENCRYPT_KEY)
    }
    const result = await this.farmRepository.filterFarm(
      filters,
      limit,
      skip,
      orders,
    );
    const data = [];
    result.data.map((element) => {
      element.cnpj = decrypt(element.cnpj, process.env.ENCRYPT_KEY);
      data.push(new ResponseFarmDto(element));
    });
    return { ...result, data };
  }

  async updateFarm(id: string, update: UpdateFarmDto) {
    if (update.cnpj && !isValidCNPJ(update.cnpj)) {
      throw new BadRequestException('Not Valid CNPJ');
    }
    const farm = await this.getById(id);

    let agriculturalArea = farm.agriculturalArea;
    let vegetationArea = farm.vegetationArea;
    let totalArea = farm.totalArea;

    if (update.agriculturalArea) {
      agriculturalArea = update.agriculturalArea;
    }
    if (update.vegetationArea) {
      vegetationArea = update.vegetationArea;
    }
    if (update.totalArea) {
      totalArea = update.totalArea;
    }

    if (agriculturalArea + vegetationArea > totalArea) {
      throw new NotAcceptableException(
        'The sum of arable area and vegetation cannot be greater than the total area of ​​the farm.',
      );
    }
    if (update.cnpj) {
      update.cnpj = encrypt(update.cnpj, process.env.ENCRYPT_KEY);
    }
    const result= await this.farmRepository.updateFarm(id, update);
    if (result && result.cnpj) {
      result.cnpj = decrypt(result.cnpj, process.env.ENCRYPT_KEY);
    }
    return result;
  }

  async getFarmStatistics() {
    const totalFarms = await this.farmRepository.getTotalFarms();
    const totalArea = await this.farmRepository.getTotalArea();
    const farmsByState = await this.farmRepository.getFarmsByState();
    const farmsByCulture = await this.farmRepository.getFarmsByCulture();
    const landUse = await this.farmRepository.getLandUse();

    return {
      totalFarms,
      totalArea,
      farmsByState,
      farmsByCulture,
      landUse,
    };
  }
}
