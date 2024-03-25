import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule, transformSchema } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RequestInfoPlugin } from './plugins/RequestInfo.plugin';
import { AppContext } from '../app.module';
import { CodeFirstModule } from './code-first/code-first.module';
import { GraphqlRateLimiterMiddleware } from './graphql-rate-limiter/graphql-rate-limiter.middleware';

const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: true,
  sortSchema: false,
  allowBatchedHttpRequests: true,
  autoSchemaFile: join(process.cwd(), 'src/graphql/code-first/schemas/schema.graphql'),
  context: ({ req }): AppContext => ({ hello: `Hello ${req.body.user}` }),
  plugins: [new RequestInfoPlugin()],
};

@Module({
  imports: [
    GraphQLModule.forRoot(apolloDriverConfig),
    CodeFirstModule,
  ],
})
export class GraphqlModule {
  static addGraphQLRateLimiter(consumer: MiddlewareConsumer) {
    consumer
      .apply(GraphqlRateLimiterMiddleware)
      .forRoutes('graphql');
  }
}
