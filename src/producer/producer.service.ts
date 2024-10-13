import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  decrypt,
  encrypt,
  isValidCPF,
  validatePaginationParams,
} from '../utils/utils';
import { CreateProducerDto } from './dto/create-producer.dto';
import { FiltersAndOrdersProducerDto } from './dto/filter-and-orders.dto';
import { ResponseProducerDto } from './dto/response-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerRepository } from './producer.repository';

@Injectable()
export class ProducerService {
  constructor(private producerRepository: ProducerRepository) {}

  async getById(id: string) {
    const producer = await this.producerRepository.getById(id);
    if (producer == null)
      throw new NotFoundException('Not Found Producer with id ' + id);
    producer.cpf = decrypt(producer.cpf, process.env.ENCRYPT_KEY);
    return new ResponseProducerDto(producer);
  }

  async createProducer(body: CreateProducerDto) {
    if (!isValidCPF(body.cpf)) {
      throw new BadRequestException('Not Valid CPF');
    }
    body.cpf = encrypt(body.cpf, process.env.ENCRYPT_KEY);
    const result = await this.producerRepository.createProducer(body);
    if (result && result.cpf) {
      result.cpf = body.cpf;
    }
    return result;
  }

  async deleteProducer(id: string) {
    await this.getById(id);
    const result = await this.producerRepository.deleteProducer(id);
    if (result) {
      return {
        status: 'success',
        message: `Successfully removed!`,
      };
    }
    return result;
  }

  async filterProducer(query: FiltersAndOrdersProducerDto) {
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

    if(filters.cpf){
      filters.cpf= encrypt(filters.cpf,process.env.ENCRYPT_KEY)
    }
    const result = await this.producerRepository.filterProducer(
      filters,
      limit,
      skip,
      orders,
    );
    const data = [];
    result.data.map((element) => {
      element.cpf = decrypt(element.cpf, process.env.ENCRYPT_KEY);
      data.push(new ResponseProducerDto(element));
    });
    return { ...result, data };
  }

  async updateProducer(id: string, update: UpdateProducerDto) {
    if (update.cpf && !isValidCPF(update.cpf)) {
      throw new BadRequestException('Not Valid CPF');
    }
    await this.getById(id);
    if (update.cpf) {
      encrypt(update.cpf, process.env.ENCRYPT_KEY);
    }
    return await this.producerRepository.updateProducer(id, update);
  }
}
