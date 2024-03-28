import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';

const redirectTemplate = readFileSync('src/templates/redirect.hbs', 'utf8');

@Injectable()
export class TemplateEngine {
  constructor() {}

  async compile(html: string, data: Record<string, any>) {
    const template = Handlebars.compile(html);
    return template(data);
  }

  async compileRedirectPage(data: any) {
    return await this.compile(redirectTemplate, data);
  }
}
