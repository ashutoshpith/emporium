import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Play {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;
}

export type TPlay = Play & Document;
export const PlaySchema = SchemaFactory.createForClass(Play);
