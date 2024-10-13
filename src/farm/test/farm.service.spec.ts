import {
  BadRequestException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CROPS } from '@prisma/client';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { FiltersAndOrdersFarmDto } from '../dto/filter-and-orders.dto';
import { ResponseFarmDto } from '../dto/response-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { FarmRepository } from '../farm.repository';
import { FarmService } from '../farm.service';

jest.mock('../../utils/utils', () => ({
  encrypt: jest.fn(() => 'encryptedCnpj'),
  decrypt: jest.fn(() => 'decryptedCnpj'),
  isValidCNPJ: jest.fn((valid) => {
    if (valid == 'validCnpj') {
      return true;
    } else return false;
  }),
  validatePaginationParams: jest.fn(() => true),
}));

describe('FarmService', () => {
  let service: FarmService;
  let repository: FarmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: FarmRepository,
          useValue: {
            getById: jest.fn(),
            createFarm: jest.fn(),
            deleteFarm: jest.fn(),
            filterFarm: jest.fn(),
            updateFarm: jest.fn(),
            getTotalFarms: jest.fn(),
            getTotalArea: jest.fn(),
            getFarmsByState: jest.fn(),
            getFarmsByCulture: jest.fn(),
            getLandUse: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    repository = module.get<FarmRepository>(FarmRepository);
  });

  describe('getById', () => {
    it('should return a farm', async () => {
      const farm = {
        id: '6f7g8h9i-0123-45fg-6789-0123456789hi',
        cnpj: '67890000000155',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        producerId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
        totalArea: 2500,
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date('2024-09-11T00:11:05.622Z'),
        updatedAt: new Date('2024-09-11T00:11:05.622Z'),
        deletedAt: null,
        producer: {
          id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
          cpf: '043dd57174371502a24afb',
          name: 'Fernanda Lima',
          city: 'São Paulo',
          state: 'São Paulo',
          createdAt: new Date('2024-09-11T00:11:05.622Z'),
          updatedAt: new Date('2024-09-11T00:11:05.622Z'),
          deletedAt: null,
        },
        cropsPlanted: [
          {
            id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: CROPS.SOYBEANS,
            createdAt: new Date('2024-09-11T00:11:05.622Z'),
          },
          {
            id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: CROPS.COFFEE,
            createdAt: new Date('2024-09-11T00:11:05.622Z'),
          },
        ],
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(farm);

      const result = await service.getById('1');
      expect(result).toEqual(
        new ResponseFarmDto({
          ...farm,
        }),
      );
    });

    it('should throw NotFoundException if farm not found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(null);

      await expect(service.getById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createFarm', () => {
    it('should create a farm', async () => {
      const createFarmDto: CreateFarmDto = {
        cnpj: 'validCnpj',
        producerId: '1',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        agriculturalArea: 2000,
        vegetationArea: 500,
      };
      const farm = {
        id: '6f7g8h9i-0123-45fg-6789-0123456789hi',
        cnpj: 'validCnpj',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        producerId: '1',
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
        producer: {
          id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
          cpf: '043dd57174371502a24afb',
          name: 'Fernanda Lima',
          city: 'São Paulo',
          state: 'São Paulo',
        },
        cropsPlanted: [
          {
            id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'SOYBEANS',
          },
          {
            id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'COFFEE',
          },
        ],
      };

      jest.spyOn(repository, 'createFarm').mockResolvedValue({ ...farm });

      const result = await service.createFarm(createFarmDto);
      expect(result).toEqual({ ...farm });
    });

    it('should throw BadRequestException if CNPJ is invalid', async () => {
      const createFarmDto: CreateFarmDto = {
        cnpj: 'invalidCnpj',
        producerId: '1',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        agriculturalArea: 2000,
        vegetationArea: 500,
      };

      await expect(service.createFarm(createFarmDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotAcceptableException if areas are invalid', async () => {
      const createFarmDto: CreateFarmDto = {
        cnpj: 'validCnpj',
        producerId: '1',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        agriculturalArea: 2000,
        vegetationArea: 600,
      };

      await expect(service.createFarm(createFarmDto)).rejects.toThrow(
        NotAcceptableException,
      );
    });
  });

  describe('getFarmStatistics', () => {
    it('should return farm statistics', async () => {
      jest.spyOn(repository, 'getTotalFarms').mockResolvedValue(10);
      jest.spyOn(repository, 'getTotalArea').mockResolvedValue(3000);
      jest
        .spyOn(repository, 'getFarmsByState')
        .mockResolvedValue([{ state: 'BA', count: 5 }]);
      jest
        .spyOn(repository, 'getFarmsByCulture')
        .mockResolvedValue([{ culture: CROPS.SOYBEANS, count: 5 }]);
      jest
        .spyOn(repository, 'getLandUse')
        .mockResolvedValue({ agriculturalArea: 2000, vegetationArea: 1000 });

      const result = await service.getFarmStatistics();
      expect(result).toEqual({
        totalFarms: 10,
        totalArea: 3000,
        farmsByState: [{ state: 'BA', count: 5 }],
        farmsByCulture: [{ culture: CROPS.SOYBEANS, count: 5 }],
        landUse: { agriculturalArea: 2000, vegetationArea: 1000 },
      });
    });
  });

  describe('deleteFarm', () => {
    it('should delete a farm successfully', async () => {
      const farm = {
        id: '1',
        cnpj: 'validCnpj',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        producerId: '1',
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
        producer: {
          id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
          cpf: '043dd57174371502a24afb',
          name: 'Fernanda Lima',
          city: 'São Paulo',
          state: 'São Paulo',
        },
        cropsPlanted: [
          {
            id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'SOYBEANS',
          },
          {
            id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'COFFEE',
          },
        ],
      };
      const deletedFarm = {
        id: '1',
        cnpj: 'validCnpj',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        producerId: '1',
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
      };
      jest.spyOn(service, 'getById').mockResolvedValue(farm);
      jest.spyOn(repository, 'deleteFarm').mockResolvedValue(deletedFarm);

      const result = await service.deleteFarm('1');
      expect(result).toEqual({
        status: 'success',
        message: 'Successfully removed!',
      });
    });

    it('should throw NotFoundException if farm does not exist', async () => {
      const id = '1';
      jest
        .spyOn(service, 'getById')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(service.deleteFarm(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateFarm', () => {
    it('should update a farm successfully', async () => {
      const update: UpdateFarmDto = {
        cnpj: 'validCnpj',
        agriculturalArea: 50,
        vegetationArea: 30,
        totalArea: 100,
      };
      const farm = {
        id: '1',
        cnpj: 'validCnpj',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        producerId: '1',
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
        producer: {
          id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
          cpf: '043dd57174371502a24afb',
          name: 'Fernanda Lima',
          city: 'São Paulo',
          state: 'São Paulo',
        },
        cropsPlanted: [
          {
            id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'SOYBEANS',
          },
          {
            id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'COFFEE',
          },
        ],
      };

      jest.spyOn(service, 'getById').mockResolvedValue(farm);
      jest
        .spyOn(repository, 'updateFarm')
        .mockResolvedValue({ ...farm, ...update });

      const result = await service.updateFarm('1', update);
      expect(result).toEqual({ ...farm, ...update, cnpj:'decryptedCnpj' });
    });

    it('should throw BadRequestException if CNPJ is invalid', async () => {
      const update: UpdateFarmDto = { cnpj: 'invalidCNPJ' };

      await expect(service.updateFarm('1', update)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotAcceptableException if areas are invalid', async () => {
      const id = '1';
      const update: UpdateFarmDto = {
        agriculturalArea: 70,
        vegetationArea: 40,
        totalArea: 100,
      };
      const farm = {
        id: '1',
        cnpj: 'validCnpj',
        name: 'Fazenda São Paulo',
        city: 'São Paulo',
        state: 'São Paulo',
        totalArea: 2500,
        producerId: '1',
        agriculturalArea: 2000,
        vegetationArea: 500,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        deletedAt: null,
        producer: {
          id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
          cpf: '043dd57174371502a24afb',
          name: 'Fernanda Lima',
          city: 'São Paulo',
          state: 'São Paulo',
        },
        cropsPlanted: [
          {
            id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'SOYBEANS',
          },
          {
            id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
            farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
            crop: 'COFFEE',
          },
        ],
      };

      jest.spyOn(service, 'getById').mockResolvedValue(farm);

      await expect(service.updateFarm(id, update)).rejects.toThrow(
        NotAcceptableException,
      );
    });
  });

  describe('filterFarm', () => {
    it('should filter farms successfully', async () => {
      const query: FiltersAndOrdersFarmDto = {
        filters: { limit: 10, page: 1 },
        orders: {},
      };
      const resultData = [
        {
          id: '1',
          cnpj: 'validCnpj',
          name: 'Fazenda São Paulo',
          city: 'São Paulo',
          state: 'São Paulo',
          totalArea: 2500,
          producerId: '1',
          agriculturalArea: 2000,
          vegetationArea: 500,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          deletedAt: null,
          producer: {
            id: 'e5f6g7h8-9012-34ef-5678-9012345678gh',
            cpf: '043dd57174371502a24afb',
            name: 'Fernanda Lima',
            city: 'São Paulo',
            state: 'São Paulo',
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            deletedAt: null,
          },
          cropsPlanted: [
            {
              id: '68f063c7-f7cd-4805-b614-8ccb6385421d',
              farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
              crop: CROPS.SOYBEANS,
              createdAt: new Date(Date.now()),
            },
            {
              id: 'c20940b8-5030-4224-9dc0-6c3d1c30fc6b',
              farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
              crop: CROPS.COFFEE,
              createdAt: new Date(Date.now()),
            },
          ],
        },
      ];
      const result = { data: resultData, total: 1, totalPags: 1 };

      jest.spyOn(repository, 'filterFarm').mockResolvedValueOnce(result);

      const response = await service.filterFarm(query);
      expect(response.data[0].cnpj).toBe('decryptedCnpj');
    });

  });
});
