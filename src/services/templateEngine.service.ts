import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { RedirectPageData } from 'src/interfaces/templateEngine.interface';

@Injectable()
export class TemplateEngine {
  constructor() {}

  templates: Record<string, string>;

  async compile(html: string, data: Record<string, any>) {
    const template = Handlebars.compile(html);
    return template(data);
  }

  async compileRedirectPage(data: RedirectPageData) {
    const redirectTemplate = readFileSync('src/templates/redirect.hbs', 'utf8');
    return await this.compile(redirectTemplate, data);
  }
}
