import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { KnexAsyncOptions, KnexOptions } from "./interface";
import { KnexService } from "./knex.service";
import { CONFIG_KNEX_OPTIONS, KNEX_CONNECTION } from "@app/constants";

@Global()
@Module({})
export class KnexModule {
  static register(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: CONFIG_KNEX_OPTIONS,
          useValue: options,
        },
        {
          provide: KNEX_CONNECTION,
          useClass: KnexService
        }
      ],
      exports: [
        {
          provide: KNEX_CONNECTION,
          useClass: KnexService
        }
      ]
    }
  }
  static registerAsync(options: KnexAsyncOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        this.createOptionsProvider(options),
        {
          provide: KNEX_CONNECTION,
          useClass: KnexService
        }
      ],
      exports: [
        {
          provide: KNEX_CONNECTION,
          useClass: KnexService
        }
      ]
    }
  }
  private static createOptionsProvider(options: KnexAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: CONFIG_KNEX_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      }
    }
  }
}