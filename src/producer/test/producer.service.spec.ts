import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerDto } from 'src/producer/dto/create-producer.dto';
import { UpdateProducerDto } from 'src/producer/dto/update-producer.dto';
import { ResponseProducerDto } from '../dto/response-producer.dto';
import { ProducerRepository } from '../producer.repository';
import { ProducerService } from '../producer.service';

jest.mock('../../utils/utils', () => ({
  encrypt: jest.fn(() => 'encryptedCpf'),
  decrypt: jest.fn(() => 'decryptedCpf'),
  isValidCPF: jest.fn((valid) => {
    if (valid == 'validCpf') {
      return true;
    } else return false;
  }),
  validatePaginationParams: jest.fn(() => true),
}));

describe('ProducerService', () => {
  let service: ProducerService;
  let repository: ProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            getById: jest.fn(),
            createProducer: jest.fn(),
            deleteProducer: jest.fn(),
            filterProducer: jest.fn(),
            updateProducer: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repository = module.get<ProducerRepository>(ProducerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a producer', async () => {
      const producer = {
        id: '1',
        cpf: 'decryptedCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
      };
      jest.spyOn(service, 'getById').mockResolvedValue(producer);

      const result = await service.getById('1');
      expect(result).toEqual(
        new ResponseProducerDto({
          ...producer,
        }),
      );
    });

    it('should throw NotFoundException if producer not found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(null);

      await expect(service.getById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createProducer', () => {
    it('should create a producer', async () => {
      const createProducerDto: CreateProducerDto = {
        cpf: 'validCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
      };
      const producer = {
        id: '1',
        cpf: 'validCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
      };

      jest
        .spyOn(repository, 'createProducer')
        .mockResolvedValue({ ...producer });

      const result = await service.createProducer(createProducerDto);
      expect(result).toEqual({ ...producer, cpf: 'encryptedCpf' });
    });

    it('should throw BadRequestException if CPF is invalid', async () => {
      const createProducerDto: CreateProducerDto = {
        cpf: 'invalidCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
      };

      await expect(service.createProducer(createProducerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('deleteProducer', () => {
    it('should delete a producer', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue({
        id: '1',
        cpf: 'decryptedCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
      });
      jest.spyOn(repository, 'deleteProducer').mockResolvedValue({
        id: '1',
        cpf: 'decryptedCpf',
        name: 'Teste',
        state: 'Bahia',
        city: 'Alagoinhas',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
      });

      const result = await service.deleteProducer('1');
      expect(result).toStrictEqual({
        status: 'success',
        message: `Successfully removed!`,
      });
    });

    it('should throw NotFoundException if producer not found', async () => {
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());

      await expect(service.deleteProducer('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('filterProducer', () => {
    it('should return filtered producers', async () => {
      const query = {
        filters: { limit: 10, page: 1, state: 'Bahia' },
      };
      const producers = [
        {
          id: '1',
          cpf: 'decryptedCpf',
          name: 'Teste',
          state: 'Bahia',
          city: 'Alagoinhas',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          deletedAt: null,
        },
      ];
      jest.spyOn(repository, 'filterProducer').mockResolvedValue({
        data: producers,
        total: 1,
        totalPags: 1,
      });

      const result = await service.filterProducer(query);
      expect(result.data).toEqual(
        producers.map((producer) => new ResponseProducerDto(producer)),
      );
    });

    describe('updateProducer', () => {
      it('should update a producer', async () => {
        const updateProducerDto: UpdateProducerDto = {
          cpf: 'validCpf',
          name: 'Updated Teste',
          state: 'Bahia',
          city: 'Alagoinhas',
        };
        const producer = {
          id: '1',
          cpf: 'validCpf',
          name: 'Updated Teste',
          state: 'Bahia',
          city: 'Alagoinhas',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          deletedAt: null,
        };

        jest.spyOn(service, 'getById').mockResolvedValue(producer);
        jest.spyOn(repository, 'updateProducer').mockResolvedValue(producer);

        const result = await service.updateProducer('1', updateProducerDto);
        expect(result).toEqual(producer);
      });

      it('should throw BadRequestException if CPF is invalid', async () => {
        const updateProducerDto: UpdateProducerDto = {
          cpf: 'invalidCpf',
          name: 'Updated Teste',
          state: 'Bahia',
          city: 'Alagoinhas',
        };

        await expect(
          service.updateProducer('1', updateProducerDto),
        ).rejects.toThrow(BadRequestException);
      });
    });
  });
});
