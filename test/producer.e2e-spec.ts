import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { randomCPF } from '../src/utils/utils';

describe('Producers E2E', () => {
  let app: INestApplication;
  let jwtToken: string;
  let cpf=randomCPF();
  let createdProducerId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'adm', password: 'adm' });

    jwtToken = response.body.accessToken;
    
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a producer', async () => {
    const createProducerDto = {
      cpf: cpf,
      name: 'João Silva',
      city: 'São Paulo',
      state: 'SP',
    };

    const response = await request(app.getHttpServer())
      .post('/producer/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createProducerDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(createProducerDto.name);
    expect(response.body.city).toBe(createProducerDto.city);
    expect(response.body.state).toBe(createProducerDto.state);
    createdProducerId= response.body.id;
  });

  it('should return 400 for invalid CPF on create', async () => {
    const createProducerDto = {
      cpf: '00002320',
      name: 'João Silva',
      city: 'São Paulo',
      state: 'SP',
    };

    const response = await request(app.getHttpServer())
      .post('/producer/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createProducerDto)
      .expect(400);

      expect(response.body.message).toBe('Not Valid CPF');
  });


  it('should get a producer by id', async () => {
    const getResponse = await request(app.getHttpServer())
      .get(`/producer/get/${createdProducerId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(getResponse.body.id).toBe(createdProducerId);
  });

  it('should filter producers', async () => {
    const filterDto = {
      filters: {
        cpf: cpf,
        limit: 10,
        page: 1,
      },
      orders: {
        createdAt: 'asc',
      },
    };

    const response = await request(app.getHttpServer())
      .get('/producer/filter')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query(filterDto)
      .expect(200);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data[0].id).toBe(createdProducerId);
  });

  it('should update a producer', async () => {
    const updateProducerDto = {
      name: 'Name Updated',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/producer/update/${createdProducerId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateProducerDto)
      .expect(200);

    expect(updateResponse.body.name).toBe(updateProducerDto.name);
  });

  it('should return 400 for invalid CPF on update', async () => {
    const updateProducerDto = {
      cpf:'0000212001',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/producer/update/${createdProducerId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateProducerDto)
      .expect(400);


    expect(updateResponse.body.message).toBe('Not Valid CPF');
  });

  it('should delete a producer', async () => {
    await request(app.getHttpServer())
      .delete(`/producer/delete/${createdProducerId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('should return 401 for creating a producer without token', async () => {
    const createProducerDto = {
      cpf: cpf,
      name: 'João Silva',
      city: 'São Paulo',
      state: 'SP',
    };

    const response = await request(app.getHttpServer())
      .post('/producer/create')
      .send(createProducerDto)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for getting a producer by id without token', async () => {
    const getResponse = await request(app.getHttpServer())
      .get(`/producer/get/${createdProducerId}`)
      .expect(401);

    expect(getResponse.body.message).toBe('Unauthorized');
  });

  it('should return 401 for filtering producers without token', async () => {
    const filterDto = {
      filters: {
        cpf: cpf,
        limit: 10,
        page: 1,
      },
      orders: {
        createdAt: 'asc',
      },
    };

    const response = await request(app.getHttpServer())
      .get('/producer/filter')
      .query(filterDto)
      .expect(401);

    expect(response.body.message).toBe('Unauthorized');
  });

  it('should return 401 for updating a producer without token', async () => {
    const updateProducerDto = {
      name: 'Name Updated',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/producer/update/${createdProducerId}`)
      .send(updateProducerDto)
      .expect(401);

    expect(updateResponse.body.message).toBe('Unauthorized');
  });

  it('should return 401 for deleting a producer without token', async () => {
    await request(app.getHttpServer())
      .delete(`/producer/delete/${createdProducerId}`)
      .expect(401);
  });

});
