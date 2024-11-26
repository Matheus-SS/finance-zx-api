import { Inject, Injectable, Logger } from "@nestjs/common";
import { Database, KnexOptions } from "./interface";
import knex from "knex";
import { CONFIG_KNEX_OPTIONS } from "../../constants";

@Injectable()
export class KnexService implements Database {
  private readonly logger: Logger;
  private _knexConnection: knex.Knex<any, unknown[]>;

  constructor(@Inject(CONFIG_KNEX_OPTIONS) private options: KnexOptions) {
    this.logger = new Logger('KnexService');
    this.logger.log(`Options: ${JSON.stringify(this.options)}`);
  };

  private getKnexConnection(): knex.Knex<any, unknown[]> {
    if (!this._knexConnection) {
      this._knexConnection = knex(this.options);
    }

    return this._knexConnection;
  }

   async queryRaw(sqlQuery: string, param?: Record<string, any>): Promise<any> {
    const result = await this.getKnexConnection().raw(sqlQuery, param);
    return result.rows;
  }

  async disconnect(): Promise<void> {
    await this.getKnexConnection().destroy();
  }
} 