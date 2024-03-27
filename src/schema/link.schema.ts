import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Domain } from 'src/schema/domain.schema';
import * as mongoose from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';

@Schema()
export class Link extends BaseSchema {
  @Prop({ type: mongoose.Schema.ObjectId, ref: Domain.name, required: true })
  domain: Domain;

  @ApiProperty()
  @Prop({ required: true })
  target: string;

  @ApiProperty({ required: false })
  @Prop({ default: 301 })
  code: number;

  @Prop({ index: true, unique: true })
  id: number;

  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  hashId: string;

  @Prop({ index: true })
  slug: string;

  @ApiProperty()
  @Prop()
  ttl: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
