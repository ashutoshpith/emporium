import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Identity {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phnNumber: string;
}

export type TIdentity = Identity & Document;
export const IdentitySchema = SchemaFactory.createForClass(Identity);
