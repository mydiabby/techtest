import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../src/user.module';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import * as request from 'supertest';
import { UpdateUserDto } from 'src/application/dto/update-user.dto';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

describe('[Feature] users - /users', () => {
  let app: INestApplication;
  const user = {
    firstName: '  Jean  ',
    lastName: ' Reno  ',
  };
  let moduleFixture: TestingModule;
  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `${path.join(__dirname, '..', '..', '.env')}`,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: 'testdb',
            port: 5432,
            username: 'testdbuser',
            password: 'testdbpass',
            database: 'testdbpostgres',
            retryAttempts: 30,
            autoLoadEntities: true,
            synchronize: true, // TODO: disable in production
            dropSchema: true, // ATTENTION: Make sure you're set on TEST DB
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  }, 300000);

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user as CreateUserDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body.firstName).toMatch('jean');
        expect(body.lastName).toMatch('reno');
        expect(body.updatedAt).toBe(null);
        expect(body.createdAt).toBeDefined();
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/users/data')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        const [[{ ...user }]] = body;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, { count }] = body;
        expect(user.firstName).toMatch('jean');
        expect(user.lastName).toMatch('reno');
        expect(user.updatedAt).toBe(null);
        expect(user.createdAt).toBeDefined();
        expect(count).toBe(1);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get('/users/data/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.firstName).toMatch('jean');
        expect(body.lastName).toMatch('reno');
        expect(body.updatedAt).toBe(null);
        expect(body.createdAt).toBeDefined();
      });
  });

  it('Update one [PATCH /:id]', () => {
    const updateduser: UpdateUserDto = {
      ...user,
      firstName: 'UpdatedName',
    };
    return request(app.getHttpServer())
      .patch('/users/1')
      .send(updateduser)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.firstName).toEqual<string>(
          updateduser.firstName.toLocaleLowerCase(),
        );
      });
  });

  it('Delete one [DEL /:id]', () => {
    return request(app.getHttpServer())
      .del('/users/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/users/data/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await moduleFixture.close();
    await app.close();
  });
});
