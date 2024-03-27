import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from 'src/services/link.service';

@Controller()
export class AppController {
  constructor(private linkService: LinkService) {}

  @Get(':slug')
  redirect(@Param('slug') slug: string) {
    return { ok: slug };
  }
}
