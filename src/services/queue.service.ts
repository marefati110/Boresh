import { Injectable } from '@nestjs/common';
import { Queue as BullQueue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'src/enums/queue.enum';
import { IsProd } from 'src/config/app.config';

@Injectable()
export class QueueService {
  constructor(@InjectQueue(Queue.LOG) private logQueue: BullQueue) {}

  async send<T>(q: Queue, data: T): Promise<Job<T>> {
    if (q === Queue.LOG) {
      return await this.logQueue.add(data, {
        removeOnComplete: !!IsProd,
        removeOnFail: !!IsProd,
      });
    }
  }
}
