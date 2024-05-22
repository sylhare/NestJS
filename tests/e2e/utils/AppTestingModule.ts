import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CatsModule } from '../../../src/cats/cats.module';
import { ModuleB } from '../../../src/nested/b/b.module';
import { GraphqlModule } from '../../../src/graphql/graphql.module';
import { AppService } from '../../../src/app.service';
import { AuthorResolver, BookResolver } from '../../../src/book/book.resolver';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CatsModule,
    ModuleB,
    GraphqlModule,
  ],
})
export class AppTestingModule {
}

@Module({
  imports: [
    AppTestingModule
  ],
  providers: [
    ConfigService,
    BookResolver,
    AuthorResolver,
  ],
})
export class AppTestingModuleWithLimiter {
  configure(consumer: MiddlewareConsumer) {
    GraphqlModule.addGraphQLRateLimiter(consumer);
  }
}