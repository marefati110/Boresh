import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { LinkService } from 'src/services/link.service';
import { LinkController } from 'src/controllers/link.controller';
import { Link, LinkSchema } from 'src/schema/link.schema';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { Domain, DomainSchema } from 'src/schema/domain.schema';
import { DomainController } from 'src/controllers/domain.controller';
import { DomainService } from 'src/services/domain.service';

const Models: ModelDefinition[] = [
  {
    name: Link.name,
    schema: LinkSchema,
  },
  {
    name: Domain.name,
    schema: DomainSchema,
  },
];

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    MongooseModule.forRoot('mongodb://localhost/boresh'),
    MongooseModule.forFeature(Models),
  ],
  providers: [LinkService, DomainService],
  controllers: [AppController, LinkController, DomainController],
})
export class AppModule {}
