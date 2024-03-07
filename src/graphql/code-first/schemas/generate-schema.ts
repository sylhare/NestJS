import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { BookResolver } from '../../../book/book.resolver';
import { CodeFirstResolver } from '../code-first.resolver';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([BookResolver, CodeFirstResolver]);
  console.log(printSchema(schema));
  return schema;
}
generateSchema();