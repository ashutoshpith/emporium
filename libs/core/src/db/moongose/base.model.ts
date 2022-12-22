import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@ObjectType({ isAbstract: true })
@Schema({ timestamps: true })
export abstract class BaseModel {
  @Field({})
  _id?: string;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Prop({ type: Date, required: false })
  deletedAt?: Date;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  isDeleted?: boolean;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: true })
  isActive?: boolean;

  @Field(() => ID, { nullable: true })
  @Prop({ type: SchemaTypes.ObjectId, required: false })
  triggeredBy?: string;
}

export type BaseModelType = BaseModel & Document;
