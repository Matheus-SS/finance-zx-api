import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  LoggerInterceptor } from './interceptor/log.interceptor';
import { AllExceptionsFilter } from './filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new LoggerInterceptor())
  await app.listen(42069);
  console.log('Starting on Port', 42069);
}
bootstrap();
