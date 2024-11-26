import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './database/knex/interface';
import { KNEX_CONNECTION } from './constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return 'Hello World!';
  }
}
