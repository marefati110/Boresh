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
  ],
  providers: [LinkService, DomainService],
  controllers: [AppController, LinkController, DomainController],
})
export class AppModule {}
