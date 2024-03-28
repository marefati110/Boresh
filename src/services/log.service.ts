import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { LogJob } from 'src/DTOs/queue.dto';
import { Queue } from 'src/enums/queue.enum';
import { IPLookup } from 'src/lib/ip';
import { ParseUA } from 'src/lib/ua';
import { Log } from 'src/schema/log.schema';

@Processor(Queue.LOG)
@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  @Process({ concurrency: 1 })
  async process(job: Job<LogJob>) {
    const data = job.data;

    const ipInfo = IPLookup(data.ip);
    const ua = ParseUA(data.ua);

    const model = new this.logModel({
      slug: data.slug,
      referer: data.referer,

      ua: data.ua,
      ip: data.ip,

      country: ipInfo?.country,
      timezone: ipInfo?.timezone,

      os: ua?.os?.name?.toLowerCase(),
      browser: ua?.browser?.name?.toLowerCase(),
      cpu: ua?.cpu?.architecture?.toLowerCase(),
      device: ua?.device?.type?.toLowerCase(),
      vendor: ua?.device.vendor?.toLowerCase(),
    });

    await model.save();

    return true;
  }
}
