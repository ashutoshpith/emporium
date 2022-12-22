import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  @Query(() => Boolean)
  signIn() {
    return true;
  }

  @Mutation(() => Boolean)
  signUp() {
    return true;
  }
}
