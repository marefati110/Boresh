import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/common/base.schema';

@Schema({ timestamps: true })
export class Domain extends BaseSchema {
  @ApiProperty()
  @Prop({ required: true })
  hostname: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
