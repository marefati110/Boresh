import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { LogJob } from 'src/DTOs/queue.dto';
import { Queue } from 'src/enums/queue.enum';

@Processor(Queue.LOG)
@Injectable()
export class LogService {
  constructor() {}

  @Process({ concurrency: 1 })
  async process(job: Job<LogJob>) {
    console.log(job.data);

    return true;
  }
}
