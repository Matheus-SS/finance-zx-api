import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KnexService } from './database/knex/knex.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly nestKnexService: KnexService
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const knex = this.nestKnexService.getKnexConnection();
    const cats = await knex.select('*').from('cats');

    return cats;
  }
}
