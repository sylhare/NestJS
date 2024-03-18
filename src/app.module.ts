import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ModuleB } from './nested/b/b.module';
import { BookResolver } from './book/book.resolver';
import { ConfigService } from '@nestjs/config';
import { GraphqlModule } from './graphql/graphql.module';

export type AppContext = { hello: string };

@Module({
  imports: [
    CatsModule,
    ModuleB,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BookResolver,
    ConfigService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    GraphqlModule.addGraphQLRateLimiter(consumer);
  }
}
