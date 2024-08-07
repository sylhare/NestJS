import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { validationPipe } from '../../src/main';
import { AppTestingModule } from './utils/AppTestingModule';
import { AuthorResolver, BookResolver } from '../../src/book/book.resolver';

describe('Book and Author', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
      providers: [BookResolver, AuthorResolver],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(validationPipe);
    await app.init();
  });

  afterEach(() => app.close());

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
          query: '{ book(id: 1) { id author { name } title } }',
        });
      expect(payload.status).toEqual(200);
      expect(payload.body.data.book).toEqual({ id: 1, title: 'title', author: { name: 'author' } });
    });
  });

  describe('Author', () => {

    it('can create an author', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          user: 'user',
          query: 'mutation createAuthor($input: CreateAuthorInput!) { createAuthor(input: $input) { name } }',
          variables: { input: { name: 'author' } },
        });
      expect(payload.status).toEqual(200);
      expect(payload.body.data.createAuthor.name).toEqual('author');
    });

    it('cannot create an author with empty name', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          user: 'user',
          query: 'mutation createAuthor($input: CreateAuthorInput!) { createAuthor(input: $input) { name } }',
          variables: { input: { name: '' } },
        });
      expect(payload.body.errors[0].message).toMatch(/name should not be empty/);
    });

    it('cannot create an author with name Robert', async () => {
      const payload = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          user: 'user',
          query: 'mutation createAuthor($input: CreateAuthorInput!) { createAuthor(input: $input) { name } }',
          variables: { input: { name: 'Robert' } },
        });
      expect(payload.body.errors[0].message).toMatch(/name must not be Robert/);
    });
  });
});