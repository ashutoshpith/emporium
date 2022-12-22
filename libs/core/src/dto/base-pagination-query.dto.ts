import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@InputType('BasePaginationQueryDtoInput')
export class BasePaginationInputDto {
  @Field(() => Number, { nullable: true })
  orderBy?: number;

  @Field(() => Number, { nullable: true })
  take?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => Number, { nullable: true })
  skip?: number;

  @Field({ nullable: true })
  queries?: string;
}

export type BasePaginationInputDtoType = BasePaginationInputDto & Document;

@ObjectType({ isAbstract: true })
export abstract class BasePaginationQueryDto {
  abstract doc: any[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
