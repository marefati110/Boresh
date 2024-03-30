import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Ip,
  NotFoundException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { LOGO_URL, THEME_COLOR, TITLE } from 'src/config/app.config';
import { LogJob } from 'src/DTOs/queue.dto';
import { Queue } from 'src/enums/queue.enum';
import { Link } from 'src/schema/link.schema';
import { LinkService } from 'src/services/link.service';
import { QueueService } from 'src/services/queue.service';
import { TemplateEngine } from 'src/services/templateEngine.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private linkService: LinkService,
    private queueService: QueueService,
    private templateEngine: TemplateEngine,
  ) {}

  @Get(':slug')
  async redirect(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    let link: Link;

    link = await this.cacheManager.get(slug);

    if (!link) {
      link = await this.linkService.getLink(slug);
    }

    if (!link) {
      throw new NotFoundException('notfound');
    }

    this.queueService.send<LogJob>(Queue.LOG, {
      ip,
      slug,
      ua: req.headers?.['user-agent'],
      referer: req.headers?.['referer'],
    });

    if (link.strategy === 'timer' || link.strategy === 'confirm') {
      const html = await this.templateEngine.compileRedirectPage({
        target: link.target,
        autoRedirect: link.strategy === 'timer',
        confirm: link.strategy === 'confirm',

        color: THEME_COLOR,
        logoURL: LOGO_URL,
        title: TITLE,
      });

      res.status(302);
      return res.end(html);

      //
    } else if (link.strategy === 'none') {
      res.status(link.code || 302);
      return res.redirect(link.target);
    }

    console.log(link.strategy);

    const ttl = 1000 * 60 * 60 * 24 * 1;
    await this.cacheManager.set(slug, link, ttl);

    throw new InternalServerErrorException('strategy is not defined');
  }
}
