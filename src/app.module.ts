import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ModuleB } from "./nested/b/b.module";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    CatsModule,
    ModuleB,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      sortSchema: false,
      autoSchemaFile: join(process.cwd(), 'src/graphql/code-first/schemas/schema.graphql'),
    }),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
