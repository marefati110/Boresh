import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get(':slug')
  redirect(@Param('slug') slug: string) {
    return { ok: slug };
  }
}
