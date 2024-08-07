import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { print } from 'graphql';
import { gql } from 'graphql-tag';
import { DataSource } from 'typeorm/data-source/DataSource';

describe('GraphQL', () => {
  let app: INestApplication, connection: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(new Logger())
      .compile();

    app = moduleFixture.createNestApplication();
    connection = app.get(DataSource);
    process.env.RATE_LIMIT_POINTS = '100';
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Rate limiting', () => {

    it('should trigger rate limiting for query', async () => {
      process.env.RATE_LIMIT_POINTS = '0';
      await app.init();
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({ user: 'rate-limiter-query', query: '{ codeFirst(id: 1) { id } }' });
      expect(payload.status).toEqual(429);
    });

    it('should trigger rate limiting for mutation', async () => {
      process.env.RATE_LIMIT_POINTS = '0';
      await app.init();
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          user: 'rate-limiter-mutation', query: print(gql`
                fragment query on CodeFirst { # to be misleading
                  id
                  exampleField
                }
                mutation query { # to be misleading
                  updateCodeFirst(updateCodeFirstInput: { exampleField: "example" }) {
                    ...query
                  }
                }
              `),
        });
      expect(payload.status).toEqual(429);
    });
  });

  describe('typeorm', () => {
    beforeEach(async () => app.init());
    afterEach(async () => {
      await connection.dropDatabase();
      await app.close();
    });

    it('creates a new user', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(gql`
            mutation createUser($input: CreateUserInput!) {
              createUser(input: $input) {
                id
                name
              }
            }
          `),
          variables: { input: { name: 'user' } },
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.createUser).toEqual({ id: expect.anything(), name: 'user' });
        });
    });

    it('queries all users', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(gql`
              mutation createUser($input: CreateUserInput!) {
                createUser(input: $input) {
                  id
                  name
                }
              }
            `),
          variables: { input: { name: 'user' } },
        });
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(gql`
              query {
                users {
                  id
                  name
                }
              }
            `),
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data.users).toEqual([{ id: expect.anything(), name: 'user' }]);
        });
    });

  });

  describe('codeFirst', () => {
    beforeEach(async () => {
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

    it('creates code first', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(gql`
                  ${codeFirstFragment}
                  mutation {
                    createCodeFirst(createCodeFirstInput: { exampleField: "example" }) {
                      ...codeFirst
                    }
                  }
                `),
        });
      expect(payload.status).toEqual(200);
      expect(payload.body.data.createCodeFirst).toEqual({ id: 1, exampleField: 'example' });
    });

    afterEach(async () => {
      await app.close();
    });
  });
});