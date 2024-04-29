import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  await app.listen(3001);
}

bootstrap();
