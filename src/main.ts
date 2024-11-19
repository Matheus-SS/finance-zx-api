import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const log = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('app.port');
  await app.listen(PORT);
  log.log(`Server running on port ${PORT}`)
}
bootstrap();
