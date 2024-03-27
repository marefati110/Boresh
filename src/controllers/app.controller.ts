import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Ip, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { LogJob } from 'src/DTOs/queue.dto';
import { Queue } from 'src/enums/queue.enum';
import { LinkService } from 'src/services/link.service';
import { QueueService } from 'src/services/queue.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private linkService: LinkService,
    private queueService: QueueService,
  ) {}

  @Get(':identity')
  async redirect(
    @Param('identity') identity: string,
    @Res() res: Response,
    @Req() req: Request,
    @Ip() ip: string,
  ) {
    const link = await this.linkService.getLink(identity);

    if (!link) {
    }

    // const cache = await this.cacheManager.get(identity);
    const ua = req.headers?.['user-agent'];

    const job: LogJob = {
      ip,
      ua,
    };
    this.queueService.send(Queue.LOG, job);

    return res.end('ok');

    await this.cacheManager.set(identity, link, 60 * 60);
    // res.status(302);
    // res.redirect('https://google.com');
  }
}
