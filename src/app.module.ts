import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from '@database/knex/knex.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, DatabaseConfig } from '@config/configuration';
import { UserController } from './controller/index';
import { ServiceModule } from './service/service.module';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './extra/httpException.filter';
import { I18nService } from './extra/localization/i18n/i18n.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === 'production' ? '.env.production' :  process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development'],
      isGlobal: true,
      load: [configuration]
    }),
    KnexModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');

        return ({
          client: dbConfig.client,
          connection: {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.name
          },
          pool: {
            min: dbConfig.poolMin,
            max: dbConfig.poolMax
          },
          debug: true
        })
      },
      inject: [ConfigService]
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, './extra/localization/i18n/'),
        watch: true
      }
    }),
    ServiceModule
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    I18nService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
