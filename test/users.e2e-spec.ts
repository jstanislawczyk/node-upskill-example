import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user-management/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../src/common/config/database/database.config';
import { NewUserDto } from '../src/user-management/dto/new-user.dto';

describe('User endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const newUser: NewUserDto = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@testmail.com',
  };
  let userId: number;

  it('GET /users/:id should return empty', () => {
    const nonExistingUserId = 1234;

    return request(app.getHttpServer())
      .get(`/users/${nonExistingUserId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('error', 'Not Found');
        expect(res.body).toHaveProperty('message', `User with id=${nonExistingUserId} not found`);
      });
  });

  it('POST /users creates a new user', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('firstName', 'John');
        expect(res.body).toHaveProperty('lastName', 'Doe');
        expect(res.body).toHaveProperty('email', 'johndoe@testmail.com');
        userId = res.body.id;
      });
  });

  it('GET /users/:id returns a user by id', () => {
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', userId);
        expect(res.body).toHaveProperty('firstName', newUser.firstName);
        expect(res.body).toHaveProperty('lastName', newUser.lastName);
        expect(res.body).toHaveProperty('email', newUser.email);
      });
  });
});
