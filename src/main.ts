import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './extra/httpException.filter';
import { I18nService } from './extra/localization/i18n/i18n.service';

async function bootstrap() {
  const log = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const i18nService = app.get(I18nService);

  app.useGlobalFilters(new HttpExceptionFilter(i18nService));
  
  app.useGlobalPipes(new ValidationPipe());

  const PORT = configService.get<number>('app.port');
  await app.listen(PORT);
  log.log(`Server running on port ${PORT}`)
}
bootstrap();
