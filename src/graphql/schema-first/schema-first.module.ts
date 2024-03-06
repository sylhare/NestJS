import { Module } from '@nestjs/common';
import { SchemaFirstResolver } from './schema-first.resolver';

@Module({
  providers: [SchemaFirstResolver],
})
export class SchemaFirstModule {
}
