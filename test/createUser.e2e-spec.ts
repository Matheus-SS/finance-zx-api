import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { BCRYPT_SERVICE, KNEX_CONNECTION } from '../src/constants';
import { Database } from '../src/database/knex/interface';

describe('User Controller - Create User (e2e)', () => {
  let app: INestApplication;
  let conn: Database;

  const bcryptServiceMock = {
    generateHash: jest.fn().mockResolvedValue('mocked-password-hash'),
  };
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(BCRYPT_SERVICE)
    .useValue(bcryptServiceMock)
    .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/v1/api/');
    conn = moduleFixture.get<Database>(KNEX_CONNECTION)
    app.init();
  });

  afterAll(async () => {
    await conn.disconnect(); // need to destroy connection after the test, if not, appears warning on console
    await app.close();
  })

  it('/v1/api/users (POST) - Create users', async () => {
     const r =  await request(app.getHttpServer())
      .post('/v1/api/users')
      .send({
        email: 'jhon4@doe.com',
        name: 'jhon doe',
        url_avatar: "http://avatar.com",
        password: "123456",
        setting_id: 1
       }).expect(201);

  });
});
