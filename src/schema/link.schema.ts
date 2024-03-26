import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ required: true })
  target: string;

  @Prop({ default: 301 })
  code: number;

  @Prop({ default: 1 })
  id: number;

  @Prop()
  ttl: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
