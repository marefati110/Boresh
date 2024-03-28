import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base.schema';

@Schema({ timestamps: true })
export class Log extends BaseSchema {
  @Prop()
  slug: string;

  @Prop()
  ip: string;

  @Prop()
  ua: string;

  @Prop()
  country: string;

  @Prop()
  timezone: string;

  @Prop()
  os: string;

  @Prop()
  browser: string;

  @Prop()
  device: string;

  @Prop()
  vendor: string;

  @Prop()
  cpu: string;

  @Prop()
  referer: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
