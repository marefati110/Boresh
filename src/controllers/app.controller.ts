import { Controller, Get, Ip, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ParseUA } from 'src/lib/ua';
import { LinkService } from 'src/services/link.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private linkService: LinkService) {}

  @Get(':identity')
  async redirect(
    @Param('identity') identity: string,
    @Res() res: Response,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    // const link = await this.linkService.getLink(identity);

    console.log(ip);

    const ua = req.headers?.['user-agent'];
    const a = ParseUA(ua);

    console.log(a);

    return res.end('ok');
    // res.status(302);
    // res.redirect('https://google.com');
  }
}
