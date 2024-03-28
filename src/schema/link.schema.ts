import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/common/base.schema';

@Schema()
export class Link extends BaseSchema {
  @ApiProperty({ required: false })
  @Prop()
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  target: string;

  @ApiProperty({ required: false })
  @Prop({ default: 302 })
  code: number;

  @Prop({ index: true, unique: true })
  id: number;

  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @ApiProperty({ required: false })
  @Prop()
  ttl: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
