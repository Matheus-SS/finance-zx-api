import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './database/knex/interface';
import { KNEX_CONNECTION } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(KNEX_CONNECTION) private readonly conn: Database
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const cats =  await this.conn.queryRaw(`select * 
      from cats 
      where name = :name 
      `, {
        name: 'tom'
      });
    console.log("cats",cats);
    return cats;
  }
}
