/* eslint-disable jest/expect-expect */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { print } from 'graphql';
import { gql } from 'graphql-tag';

describe('GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  describe('Rate limiting', () => {
    beforeEach(async () => {
      process.env.RATE_LIMIT_POINTS = '0';
      await app.init();
    });

    it('should trigger rate limiting', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({ user: 'test' });
      expect(payload.status).toEqual(429);
    });
  });

  describe('Book', () => {
    beforeEach(async () => {
      process.env.RATE_LIMIT_POINTS = '100';
      await app.init();
    });

    it('queries a book', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          user: 'user',
          query: '{ book(id: 1) { id author title } }',
        });
      expect(payload.status).toEqual(200);
      expect(payload.body.data.book).toEqual({ id: 1, title: 'title', author: 'author' });
    });
  });

  describe('codeFirst', () => {
    beforeEach(async () => {
      process.env.RATE_LIMIT_POINTS = undefined;
      await app.init();
    });
    const codeFirstFragment = gql`
          fragment codeFirst on CodeFirst {
            id
            exampleField
          }
        `;
    const codeFirstQuery = gql`
          ${codeFirstFragment}
          query codeFirst($id: Int!) {
            codeFirst(id: $id) {
              ...codeFirst
            }
          }
        `;

    it('queries code first', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(codeFirstQuery),
          variables: { id: 1 },
        });
      expect(payload.status).toEqual(200);
      expect(payload.body.data.codeFirst).toEqual({ id: 1, exampleField: 'example' });
    });

    afterEach(async () => {
      await app.close();
    });
  });
});