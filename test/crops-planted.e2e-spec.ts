import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';

describe('CropsPlantedController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;
  let seedFarmId = '1a2b3c4d-5678-90ab-cdef-1234567890ab';
  let createdFarmId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'adm', password: 'adm' });
    token = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/crops-planted/create (POST)', async () => {
    const createDto = {
      farmId: seedFarmId,
      crop: 'CORN',
    };

    return request(app.getHttpServer())
      .post('/crops-planted/create')
      .set('Authorization', `Bearer ${token}`)
      .send(createDto)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.farmId).toBe(createDto.farmId);
        expect(res.body.crop).toBe(createDto.crop);
        createdFarmId = res.body.id;
      });
  });

  it('/crops-planted/get/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/crops-planted/get/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdFarmId);
      });
  });

  it('/crops-planted/filter (GET)', async () => {
    const query = {
      filters: { farmId: seedFarmId, crop: 'CORN', limit: 10, page: 1 },
      orders: { createdAt: 'asc' },
    };

    return request(app.getHttpServer())
      .get('/crops-planted/filter')
      .set('Authorization', `Bearer ${token}`)
      .query(query)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });

  it('/crops-planted/update/:id (PATCH)', async () => {
    const updateDto = { crop: 'SOYBEANS' };

    return request(app.getHttpServer())
      .patch(`/crops-planted/update/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdFarmId);
        expect(res.body.crop).toBe(updateDto.crop);
      });
  });

  it('/crops-planted/delete/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`/crops-planted/delete/${createdFarmId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/crops-planted/create (POST) should return 401 without token', async () => {
    const createDto = {
      farmId: seedFarmId,
      crop: 'CORN',
    };

    return request(app.getHttpServer())
      .post('/crops-planted/create')
      .send(createDto)
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe('Unauthorized');
      });
  });

  it('/crops-planted/get/:id (GET) should return 401 without token', async () => {
    return request(app.getHttpServer())
      .get(`/crops-planted/get/${createdFarmId}`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      });
  });

  it('/crops-planted/filter (GET) should return 401 without token', async () => {
    const query = {
      filters: { farmId: seedFarmId, crop: 'CORN', limit: 10, page: 1 },
      orders: { createdAt: 'asc' },
    };

    return request(app.getHttpServer())
      .get('/crops-planted/filter')
      .query(query)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      });
  });

  it('/crops-planted/update/:id (PATCH) should return 401 without token', async () => {
    const updateDto = { crop: 'SOYBEANS' };

    return request(app.getHttpServer())
      .patch(`/crops-planted/update/${createdFarmId}`)
      .send(updateDto)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      });
  });

  it('/crops-planted/delete/:id (DELETE) should return 401 without token', async () => {
    return request(app.getHttpServer())
      .delete(`/crops-planted/delete/${createdFarmId}`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      });
  });
});
