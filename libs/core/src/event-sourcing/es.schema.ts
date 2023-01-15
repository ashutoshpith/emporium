import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document } from 'mongoose';

@Schema()
export class ESPayload {
  @Prop({ type: SchemaTypes.Mixed })
  props: any;

  @Prop({ type: String })
  eventName: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  deletedAt: Date;

  @Prop({ type: Date })
  startTime?: Date;

  @Prop({ type: Date })
  endTime?: Date;

  @Prop({ type: String })
  slug?: string;

  @Prop({ type: String })
  schedulerId?: string;

  @Prop({ type: String })
  cancelReason?: string;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Object })
  input: any;

  @Prop({ type: SchemaTypes.Mixed })
  changes: any;

  @Prop()
  triggeredBy: string;

  @Prop({ type: Date, default: new Date() })
  lastAccessAt: Date;

  @Prop({ type: String })
  id: string;

  @Prop({ required: false })
  source?: string;
}
export const ESPayloadSchema = SchemaFactory.createForClass(ESPayload);

@Schema({ collection: 'events' })
export class ES {
  @Prop({ type: String })
  aggregateId: string;

  @Prop({ type: String })
  aggregate: string;

  @Prop({ type: ESPayloadSchema })
  payload: ESPayload;
}

export type ESDocument = ES & Document;
export const ESSchema = SchemaFactory.createForClass(ES);
