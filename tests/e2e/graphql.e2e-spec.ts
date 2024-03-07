/* eslint-disable jest/expect-expect */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { gql } from 'graphql-request';

describe('GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Book', () => {
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
          query: codeFirstQuery,
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