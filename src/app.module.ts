import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ModuleB } from './nested/b/b.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CodeFirstModule } from './graphql/code-first/code-first.module';
import { BookResolver } from './book/book.resolver';

@Module({
  imports: [
    CatsModule,
    ModuleB,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      sortSchema: false,
      autoSchemaFile: join(process.cwd(), 'src/graphql/code-first/schemas/schema.graphql'),
      context: ({ req }) => ({ hello: `Hello ${req.body.user}` }),
    }),
    CodeFirstModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookResolver],
})
export class AppModule {}
