import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { LinkService } from 'src/services/link.service';
import { LinkController } from 'src/controllers/link.controller';
import { Link, LinkSchema } from 'src/schema/link.schema';
import { Log, LogSchema } from 'src/schema/log.schema';
import { BullModule } from '@nestjs/bull';
import { REDIS_HOST, REDIS_PORT } from 'src/config/app.config';
import { Queue } from 'src/enums/queue.enum';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { QueueService } from 'src/services/queue.service';
import { LogService } from 'src/services/log.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TemplateEngine } from 'src/services/templateEngine.service';
import { MorganMiddleware } from '@nest-middlewares/morgan';

const Models: ModelDefinition[] = [
  {
    name: Link.name,
    schema: LinkSchema,
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          host: REDIS_HOST,
          port: REDIS_PORT,
        });

        return {
          store: store,
        };
      },
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
  providers: [LinkService, QueueService, LogService, TemplateEngine],
  controllers: [AppController, LinkController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes();
  }
}
