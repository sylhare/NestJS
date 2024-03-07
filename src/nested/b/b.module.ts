import { Module } from '@nestjs/common';
import { ServiceB } from './b.service';
import { ModuleA } from '../a/a.module';

@Module({
  imports: [ModuleA],
  providers: [ServiceB],
})
export class ModuleB {}