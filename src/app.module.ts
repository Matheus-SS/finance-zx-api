import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './database/knex/knex.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, DatabaseConfig } from './config/configuration';
import { UserController } from './controller/index';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'],
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
    ServiceModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
