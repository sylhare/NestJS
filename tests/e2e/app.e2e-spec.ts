/* eslint-disable jest/expect-expect */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns "Hello World!" on: / (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('CatsController', () => {
    it('creates cat', () => {
      return request(app.getHttpServer())
        .post('/cats')
        .expect(204);
    });

    it('returns a cat', async () => {
      const response = await request(app.getHttpServer())
        .get('/cats/1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('This action returns a #1 cat');
    });

    it('returns all the cats', async () => {
      const payload = { test: 'value' };
      const response = await request(app.getHttpServer())
        .get('/cats/custom')
        .send(payload);
      expect(response.status).toBe(200);
      expect(response.text).toBe(`This action returns all cats from ${JSON.stringify(payload)}!`);
    });
  });
});
