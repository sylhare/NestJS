import { Module } from '@nestjs/common';
import { ServiceA } from "./a.service";

@Module({
  providers: [ServiceA],
  exports: [ServiceA],
})
export class ModuleA {}