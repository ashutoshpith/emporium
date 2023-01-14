import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthKafkaProducer } from './auth-kafka.producer';

@Resolver()
export class AuthResolver {
  constructor(private readonly authKafkaProducer: AuthKafkaProducer) {}

  @Query(() => Boolean)
  async signIn() {
    await this.authKafkaProducer.sendMessageEvent('hello oe');
    return true;
  }

  @Mutation(() => Boolean)
  signUp() {
    return true;
  }
}
