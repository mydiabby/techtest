import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let moduleFixture: TestingModule;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect('OK');
  });

  afterAll(async () => {
    await moduleFixture.close();
    await app.close();
  });
});
