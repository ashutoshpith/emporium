import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class NotificationResolver {
  @Query(() => Boolean)
  signIn() {
    return true;
  }

  @Mutation(() => Boolean)
  signUp() {
    return true;
  }
}
