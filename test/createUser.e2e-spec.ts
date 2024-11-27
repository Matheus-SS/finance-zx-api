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
  
  const seedSql = `
   create table if not exists tbl_users(
      id serial primary key,
      name varchar(100) not null,
      email varchar(100) unique not null,
      url_avatar varchar(250),
      password varchar(250) not null,
      setting_id int,
      created_at bigint NOT NULL DEFAULT extract(EPOCH from NOW()),
      updated_at bigint
  );

  create or replace function update_updated_at()
  returns trigger as $$
  begin 
    new.updated_at = extract(epoch from now());
    return new;
  end;
  $$ language plpgsql;

  drop trigger if exists tbl_users_set_updated_at on tbl_users;

  create trigger tbl_users_set_updated_at
  before update on tbl_users
  for each row 
  execute function update_updated_at();
  `
  const requestBody = {
    email: 'jhon@doe.com',
    name: 'jhon doe',
    url_avatar: "http://avatar.com",
    password: "123456",
    setting_id: 1
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(BCRYPT_SERVICE)
    .useValue(bcryptServiceMock)
    .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/v1/api/');
    conn = moduleFixture.get<Database>(KNEX_CONNECTION);

    app.init();
    await conn.queryRaw(seedSql);
  })

  afterEach(async () => {
    await conn.queryRaw(`truncate tbl_users restart identity;`)
  });

  afterAll(async () => {
    await conn.queryRaw("drop table tbl_users");
    await conn.disconnect(); // need to destroy connection after the test, if not, appears warning on console
    await app.close();
  });

  it('/v1/api/users (POST) - Create users', async () => {
     const r =  await request(app.getHttpServer())
      .post('/v1/api/users')
      .send(requestBody).expect(201);

      const res = await conn.queryRaw(`SELECT id, email, name, url_avatar, password, setting_id, created_at, updated_at FROM tbl_users WHERE id = 1`)
      expect(r.text).toBe('ok');
      expect(res[0]?.id).toBe(1);
      expect(res[0]?.name).toEqual('jhon doe');
      expect(res[0]?.email).toEqual('jhon@doe.com');
      expect(res[0]?.url_avatar).toEqual('http://avatar.com');
      expect(res[0]?.password).toBeTruthy();
      expect(res[0]?.setting_id).toBe(1);
      expect(res[0]?.updated_at).toBe(null);
  });

  it('/v1/api/users (POST) - Create users conflicted error', async () => {
    await request(app.getHttpServer())
     .post('/v1/api/users')
     .send(requestBody);

    const r = await request(app.getHttpServer())
     .post('/v1/api/users')
     .send(requestBody).expect(409);
    
    expect(r.body.statusCode).toBe(409);
    expect(r.body.message).toBe('User already exists');
  });
  
  it('/v1/api/users (POST) - Create users when url_avatar and setting_id is undefined', async () => {
    const { url_avatar, setting_id, ...rest } = requestBody
    const r =  await request(app.getHttpServer())
     .post('/v1/api/users')
     .send(rest).expect(201);

     const res = await conn.queryRaw(`SELECT id, email, name, url_avatar, password, setting_id, created_at, updated_at FROM tbl_users WHERE id = 1`)
     
     expect(r.text).toBe('ok');
     expect(res[0]?.id).toBe(1);
     expect(res[0]?.name).toEqual('jhon doe');
     expect(res[0]?.email).toEqual('jhon@doe.com');
     expect(res[0]?.password).toBeTruthy();
     expect(res[0]?.url_avatar).toEqual(null);
     expect(res[0]?.setting_id).toBe(null);
     expect(res[0]?.updated_at).toBe(null);
  });

  it('/v1/api/users (POST) - Create users when url_avatar is undefined', async () => {
    const { url_avatar, ...rest } = requestBody
    const r =  await request(app.getHttpServer())
     .post('/v1/api/users')
     .send(rest).expect(201);

     const res = await conn.queryRaw(`SELECT id, email, name, url_avatar, password, setting_id, created_at, updated_at FROM tbl_users WHERE id = 1`)
     
     expect(r.text).toBe('ok');
     expect(res[0]?.id).toBe(1);
     expect(res[0]?.name).toEqual('jhon doe');
     expect(res[0]?.email).toEqual('jhon@doe.com');
     expect(res[0]?.password).toBeTruthy();
     expect(res[0]?.url_avatar).toEqual(null);
     expect(res[0]?.setting_id).toBe(1);
     expect(res[0]?.updated_at).toBe(null);
  });

  it('/v1/api/users (POST) - Create users when setting_id is undefined', async () => {
    const { setting_id, ...rest } = requestBody
    const r =  await request(app.getHttpServer())
     .post('/v1/api/users')
     .send(rest).expect(201);

     const res = await conn.queryRaw(`SELECT id, email, name, url_avatar, password, setting_id, created_at, updated_at FROM tbl_users WHERE id = 1`)
     
     expect(r.text).toBe('ok');
     expect(res[0]?.id).toBe(1);
     expect(res[0]?.name).toEqual('jhon doe');
     expect(res[0]?.email).toEqual('jhon@doe.com');
     expect(res[0]?.password).toBeTruthy();
     expect(res[0]?.url_avatar).toEqual("http://avatar.com");
     expect(res[0]?.setting_id).toBe(null);
     expect(res[0]?.updated_at).toBe(null);
  });

});
