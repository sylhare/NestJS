import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RequestInfoPlugin } from './plugins/RequestInfo.plugin';
import { AppContext } from '../app.module';
import { CodeFirstModule } from './code-first/code-first.module';
import { GraphqlRateLimiterMiddleware } from './graphql-rate-limiter/graphql-rate-limiter.middleware';
import { GraphQLComplexityService } from './graphql-complexity/graphql-complexity.service';

const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: true,
  sortSchema: false,
  allowBatchedHttpRequests: true,
  autoSchemaFile: join(process.cwd(), 'src/graphql/code-first/schemas/schema.graphql'),
  context: ({ req }): AppContext => ({ hello: `Hello ${req.body.user}` }),
  formatError: (error) => {
    return {
      message: error.extensions['originalError']?.['message'].join(', ') ?? error.message,
      path: error.path,
      locations: error.locations,
      extensions: {
        code: error.extensions['code'],
      },
    };
  },
  plugins: [new RequestInfoPlugin()],
};

@Module({
  imports: [
    GraphQLModule.forRoot(apolloDriverConfig),
    CodeFirstModule,
  ],
  providers: [GraphQLComplexityService],
})
export class GraphqlModule {
  static addGraphQLRateLimiter(consumer: MiddlewareConsumer) {
    consumer
      .apply(GraphqlRateLimiterMiddleware)
      .forRoutes('graphql');
  }
}
