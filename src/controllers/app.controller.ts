import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LinkService } from 'src/services/link.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private linkService: LinkService) {}

  @Get(':identity')
  async redirect(@Param('identity') identity: string, @Res() res: Response) {
    const link = await this.linkService.getLink(identity);

    console.log(link);

    res.status(302);
    res.redirect('https://google.com');
  }
}
