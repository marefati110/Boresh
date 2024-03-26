import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkService } from 'src/services/link.service';
import { LinkController } from 'src/controllers/link.controller';
import { Link, LinkSchema } from 'src/schema/link.schema';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    MongooseModule.forRoot('mongodb://localhost/boresh'),
    MongooseModule.forFeature([
      {
        name: Link.name,
        schema: LinkSchema,
      },
    ]),
  ],
  controllers: [AppController, LinkController],
  providers: [AppService, LinkService],
})
export class AppModule {}
