import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './extra/httpException.filter';
import { I18nService } from './extra/localization/i18n/i18n.service';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const log = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const i18nService = app.get(I18nService);

  const origin = configService.get<string>('app.corsOrigin');

  app.enableCors({
    origin: origin,
    credentials: true
  });

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter(i18nService));

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('/v1/api/');

  const config = new DocumentBuilder()
    .setTitle('Finance api')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, documentFactory);

  const PORT = configService.get<number>('app.port');
  await app.listen(PORT);
  log.log(`Server running on port ${PORT}`)
}
bootstrap();
