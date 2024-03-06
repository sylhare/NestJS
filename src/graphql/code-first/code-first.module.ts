import { Module } from '@nestjs/common';
import { CodeFirstResolver } from './code-first.resolver';

@Module({
  providers: [CodeFirstResolver],
})
export class CodeFirstModule {}
