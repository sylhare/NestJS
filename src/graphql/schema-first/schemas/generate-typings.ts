import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

/**
 * For schema first API, this configuration can be added directly in the GraphQLModule used by AppModule
 * It generates typings from the graphql schema.
 * Run it via: `npm run graphql:generate`
 *
 * */
const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/graphql/schema-first/schemas/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql/schema-first/dto/schema-first.graphql.ts'),
  outputAs: 'class',
});