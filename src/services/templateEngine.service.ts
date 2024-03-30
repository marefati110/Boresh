import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { IsProd } from 'src/config/app.config';

@Injectable()
export class TemplateEngine {
  constructor() {}

  templates: Record<string, string>;

  async compile(html: string, data: Record<string, any>) {
    const template = Handlebars.compile(html);
    return template(data);
  }

  async compileRedirectPage(data: any) {
    const redirectTemplate = readFileSync('src/templates/redirect.hbs', 'utf8');
    return await this.compile(redirectTemplate, data);
  }
}
