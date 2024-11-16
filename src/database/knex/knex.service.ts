import { Inject, Injectable, Logger } from "@nestjs/common";
import { KnexOptions } from "./interface";
import knex from "knex";

@Injectable()
export class KnexService {
  private readonly logger: Logger;
  private _knexConnection: knex.Knex<any, unknown[]>;

  constructor(@Inject('CONFIG_KNEX_OPTIONS') private options: KnexOptions) {
    this.logger = new Logger('KnexService');
    this.logger.log(`Options: ${JSON.stringify(this.options)}`);
  };

  getKnexConnection(): knex.Knex<any, unknown[]> {
    if (!this._knexConnection) {
      this._knexConnection = knex(this.options);
    }

    return this._knexConnection;
  }
} 