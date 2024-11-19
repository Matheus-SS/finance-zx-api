import { Injectable } from '@nestjs/common';
import { I18nService as NestI18nService } from 'nestjs-i18n';

@Injectable()
export class I18nService {
  constructor(private readonly i18n: NestI18nService) {}

  public translate(
    key: string,
    lang: string,
    args?: Record<string, any>,
  ): string {
    return this.i18n.translate(key, { lang: lang, args: args });
  }
}
