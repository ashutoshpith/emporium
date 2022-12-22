import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType('BaseInputDto')
export abstract class BaseDto {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
