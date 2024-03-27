import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { LinkService } from 'src/services/link.service';
import { LinkController } from 'src/controllers/link.controller';
import { Link, LinkSchema } from 'src/schema/link.schema';
import { Domain, DomainSchema } from 'src/schema/domain.schema';
import { DomainController } from 'src/controllers/domain.controller';
import { DomainService } from 'src/services/domain.service';
import { Log, LogSchema } from 'src/schema/log.schema';
import { BullModule } from '@nestjs/bull';
import { REDIS_HOST, REDIS_PORT } from 'src/config/app.config';
import { Queue } from 'src/enums/queue.enum';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { CacheModule } from '@nestjs/cache-manager';

const Models: ModelDefinition[] = [
  {
    name: Link.name,
    schema: LinkSchema,
  },
  {
    name: Domain.name,
    schema: DomainSchema,
  },
  {
    name: Log.name,
    schema: LogSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/boresh'),
    MongooseModule.forFeature(Models),
    CacheModule.register({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullModule.registerQueue({
      name: Queue.LOG,
    }),
    BullBoardModule.forFeature({
      name: Queue.LOG,
      adapter: BullAdapter,
    }),
  ],
  providers: [LinkService, DomainService],
  controllers: [AppController, LinkController, DomainController],
})
export class AppModule {}
