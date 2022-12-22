import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProductResolver {
  @Query(() => Boolean)
  prodcutIn() {
    return true;
  }

  @Mutation(() => Boolean)
  productUp() {
    return true;
  }
}
