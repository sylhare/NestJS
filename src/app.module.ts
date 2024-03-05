import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ModuleB } from "./nested/b/b.module";

@Module({
  imports: [CatsModule, ModuleB],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
