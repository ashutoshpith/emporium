import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Authenticate {
  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;
}

export type TAuthenticateDocument = HydratedDocument<Authenticate>;
export const AuthenticateSchema = SchemaFactory.createForClass(Authenticate);
