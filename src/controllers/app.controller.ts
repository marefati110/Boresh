import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinkService } from 'src/services/link.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private linkService: LinkService) {}

  @Get(':slug')
  redirect(@Param('slug') slug: string) {
    return { ok: slug };
  }
}
