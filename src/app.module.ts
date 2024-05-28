import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ModuleB } from './nested/b/b.module';
import { AuthorResolver, BookResolver } from './book/book.resolver';
import { ConfigService } from '@nestjs/config';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './typeorm/database.module';

export type AppContext = { hello: string };

@Module({
  imports: [
    CatsModule,
    ModuleB,
    GraphqlModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BookResolver,
    AuthorResolver,
    ConfigService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    GraphqlModule.addGraphQLRateLimiter(consumer);
  }
}
