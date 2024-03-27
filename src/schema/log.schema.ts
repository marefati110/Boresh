import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/base.schema';

@Schema()
export class Log extends BaseSchema {}

export const LogSchema = SchemaFactory.createForClass(Log);
