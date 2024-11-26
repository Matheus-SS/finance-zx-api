import { Knex } from "knex";

export interface KnexOptions extends Knex.Config {}

export interface Database {
  queryRaw(sqlQuery: string, param?: Record<string, any>): Promise<any>;
  disconnect(): Promise<void>;
}

export interface KnexAsyncOptions {
  inject?: any[],
  useFactory?: (...args: any[]) => Promise<KnexOptions> | KnexOptions
}