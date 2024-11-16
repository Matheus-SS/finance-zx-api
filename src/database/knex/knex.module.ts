import { DynamicModule, Module } from "@nestjs/common";
import { KnexOptions } from "./interface";
import { KnexService } from "./knex.service";

@Module({})
export class KnexModule {
  static register(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [
        {
          provide: 'CONFIG_KNEX_OPTIONS',
          useValue: options
        },
        KnexService
      ],
      exports: [KnexService]
    }
  }
}