import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CROPS } from '@prisma/client';
import { CropsPlantedRepository } from '../crops-planted.repository';
import { CropsPlantedService } from '../crops-planted.service';
import { CreateCropsPlantedDto } from '../dto/create-crops.dto';
import { ResponseCropsPlantedDto } from '../dto/response-crops.dto';
import { UpdateCropsPlantedDto } from '../dto/update-crops.dto';

jest.mock('../../utils/utils', () => ({
  validateCrop: jest.fn((crop) => {
    const validCrops = ['SOYBEANS', 'CORN', 'COTTON', 'COFFEE', 'SUGAR_CANE'];
    return validCrops.includes(crop);
  }),
  validatePaginationParams: jest.fn(() => true),
}));

describe('CropsPlantedService', () => {
  let service: CropsPlantedService;
  let repository: CropsPlantedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsPlantedService,
        {
          provide: CropsPlantedRepository,
          useValue: {
            getById: jest.fn(),
            createCropsPlanted: jest.fn(),
            deleteCropsPlanted: jest.fn(),
            filterCropsPlanted: jest.fn(),
            updateCropsPlanted: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CropsPlantedService>(CropsPlantedService);
    repository = module.get<CropsPlantedRepository>(CropsPlantedRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a cropsPlanted', async () => {
      const cropsPlanted = {
        id: '1',
        farmId: '1',
        crop: CROPS.SOYBEANS,
        createdAt: new Date('2024-09-11T00:11:05.622Z'),
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(cropsPlanted);

      const result = await service.getById('1');
      expect(result).toEqual(
        new ResponseCropsPlantedDto({
          ...cropsPlanted,
        }),
      );
    });

    it('should throw NotFoundException if cropsPlanted not found', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(null);

      await expect(service.getById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCropsPlanted', () => {
    it('should create a cropsPlanted', async () => {
      const createCropsPlantedDto: CreateCropsPlantedDto = {
        farmId: '1',
        crop: CROPS.SOYBEANS,
      };
      const cropsPlanted = {
        id: '1',
        farmId: '1',
        crop: CROPS.SOYBEANS,
        createdAt: new Date(Date.now()),
      };

      jest
        .spyOn(repository, 'createCropsPlanted')
        .mockResolvedValue({ ...cropsPlanted });

      const result = await service.createCropsPlanted(createCropsPlantedDto);
      expect(result).toEqual({ ...cropsPlanted });
    });
  });

  describe('deleteCropsPlanted', () => {
    it('should delete a cropsPlanted', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue({
        id: '1',
        farmId: '1',
        crop: 'SOYBEANS',
      });
      jest.spyOn(repository, 'deleteCropsPlanted').mockResolvedValue({
        id: '1',
        farmId: '6f7g8h9i-0123-45fg-6789-0123456789hi',
        crop: CROPS.SOYBEANS,
        createdAt: new Date('2024-09-11T00:11:05.622Z'),
      });

      const result = await service.deleteCropsPlanted('1');
      expect(result).toStrictEqual({
        status: 'success',
        message: `Successfully removed!`,
      });
    });
  });

  describe('filterCropsPlanted', () => {
    it('should return filtered cropsPlanted', async () => {
      const query = {
        filters: { limit: 10, page: 1, crop: CROPS.SOYBEANS },
      };
      const cropsPlanted = [
        {
          id: '1',
          farmId: '1',
          crop: CROPS.SOYBEANS,
          createdAt: new Date('2024-09-11T00:11:05.622Z'),
        },
      ];
      jest.spyOn(repository, 'filterCropsPlanted').mockResolvedValue({
        data: cropsPlanted,
        total: 1,
        totalPags: 1,
      });

      const result = await service.filterCropsPlanted(query);
      expect(result.data).toEqual(
        cropsPlanted.map((crop) => new ResponseCropsPlantedDto(crop)),
      );
    });
  });

  describe('updateCropsPlanted', () => {
    it('should update a cropsPlanted', async () => {
      const updateCropsPlantedDto: UpdateCropsPlantedDto = {
        farmId: '1',
        crop: CROPS.CORN,
      };
      const cropsPlanted = {
        id: '1',
        farmId: '1',
        crop: CROPS.CORN,
        createdAt: new Date(Date.now()),
      };

      jest.spyOn(service, 'getById').mockResolvedValue(cropsPlanted);
      jest
        .spyOn(repository, 'updateCropsPlanted')
        .mockResolvedValue(cropsPlanted);

      const result = await service.updateCropsPlanted(
        '1',
        updateCropsPlantedDto,
      );
      expect(result).toEqual(cropsPlanted);
    });
  });
});
