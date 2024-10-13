import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { randomCNPJ } from '../src/utils/utils';

describe('FarmController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let seedProducerId = 'f6d9cb09-1220-4cac-86b7-2739e7a5a243';
  let createdFarmId;
  let cnpj=randomCNPJ();
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'adm', password: 'adm' });
    token = response.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/farm/create (POST)', async () => {
    const createFarmDto = {
      producerId: seedProducerId,
      cnpj: cnpj,
      name: 'Fazenda Boa Vista',
      city: 'Alagoinhas',
      state: 'BA',
      totalArea: 10,
      agriculturalArea: 7,
      vegetationArea: 3,
    };

    await request(app.getHttpServer())
      .post('/farm/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createFarmDto)
      .expect(201)
      .then((res) => {
        createdFarmId = res.body.id;
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(createFarmDto.name);
      });
  });

  it('/farm/get/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/farm/get/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdFarmId);
  });

  it('/farm/filter (GET)', async () => {
    const filtersAndOrdersFarmDto = {
      filters: {
        limit: 10,
        page: 1,
      },
    };

    const response = await request(app.getHttpServer())
      .get('/farm/filter')
      .set('Authorization', `Bearer ${token}`)
      .query(filtersAndOrdersFarmDto)
      .expect(200);

    expect(response.body).toBeInstanceOf(Object);
  });

  it('/farm/statistics (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/farm/statistics')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('totalFarms');
  });

  it('/farm/update/:id (PATCH)', async () => {
    const updateFarmDto = {
      name: 'Fazenda Atualizada',
    };

    const response = await request(app.getHttpServer())
      .patch(`/farm/update/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateFarmDto)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdFarmId);
    expect(response.body.name).toBe(updateFarmDto.name);
  });

  it('should return 400 for invalid CNPJ on create', async () => {
    const createFarmDto = {
      producerId: seedProducerId,
      cnpj: '0000000020203',
      name: 'Fazenda Boa Vista',
      city: 'Alagoinhas',
      state: 'BA',
      totalArea: 10,
      agriculturalArea: 7,
      vegetationArea: 3,
    };

    const response = await request(app.getHttpServer())
      .post('/farm/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createFarmDto)
      .expect(400);

    expect(response.body.message).toBe('Not Valid CNPJ');
  });

  it('should return 406 for invalid area sum on create', async () => {
    const createFarmDto = {
      producerId: seedProducerId,
      cnpj: cnpj,
      name: 'Fazenda Boa Vista',
      city: 'Alagoinhas',
      state: 'BA',
      totalArea: 10,
      agriculturalArea: 8,
      vegetationArea: 3,
    };

    const response = await request(app.getHttpServer())
      .post('/farm/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createFarmDto)
      .expect(406);

    expect(response.body.message).toBe(
      'The sum of arable area and vegetation cannot be greater than the total area of ​​the farm.',
    );
  });

  it('should return 400 for invalid CNPJ on update', async () => {
    const updateFarmDto = {
      cnpj: 'invalid-cnpj',
    };

    const response = await request(app.getHttpServer())
      .patch(`/farm/update/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateFarmDto)
      .expect(400);

    expect(response.body.message).toBe('Not Valid CNPJ');
  });

  it('should return 406 for invalid area sum on update', async () => {
    const updateFarmDto = {
      agriculturalArea: 8,
      vegetationArea: 3,
      totalArea: 10,
    };

    const response = await request(app.getHttpServer())
      .patch(`/farm/update/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateFarmDto)
      .expect(406);

    expect(response.body.message).toBe(
      'The sum of arable area and vegetation cannot be greater than the total area of ​​the farm.',
    );
  });

  it('/farm/delete/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/farm/delete/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should return 401 for creating a farm without token', async () => {
    const createFarmDto = {
      producerId: seedProducerId,
      cnpj: cnpj,
      name: 'Fazenda Boa Vista',
      city: 'Alagoinhas',
      state: 'BA',
      totalArea: 10,
      agriculturalArea: 7,
      vegetationArea: 3,
    };

    const response = await request(app.getHttpServer())
      .post('/farm/create')
      .send(createFarmDto)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for getting a farm by id without token', async () => {
    const response = await request(app.getHttpServer())
      .get(`/farm/get/${createdFarmId}`)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for filtering farms without token', async () => {
    const filtersAndOrdersFarmDto = {
      filters: {
        limit: 10,
        page: 1,
      },
    };

    const response = await request(app.getHttpServer())
      .get('/farm/filter')
      .query(filtersAndOrdersFarmDto)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for getting farm statistics without token', async () => {
    const response = await request(app.getHttpServer())
      .get('/farm/statistics')
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for updating a farm without token', async () => {
    const updateFarmDto = {
      name: 'Fazenda Atualizada',
    };

    const response = await request(app.getHttpServer())
      .patch(`/farm/update/${createdFarmId}`)
      .send(updateFarmDto)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for deleting a farm without token', async () => {
    await request(app.getHttpServer())
      .delete(`/farm/delete/${createdFarmId}`)
      .expect(401);
  });

});
