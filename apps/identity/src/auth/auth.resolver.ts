import { KafkaPartitionService } from '@core/core/message-broker/kafka.producer';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthKafkaProducer } from './auth-kafka.producer';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) // private readonly authKafkaProducer: AuthKafkaProducer,
  {}

  @Query(() => Boolean)
  async signIn(@Args('data') data: string) {
    // this.authKafkaProducer.sendMessageEvent(
    //   data,
    //   KafkaPartitionService.IDENTITY_SERVICE,
    // );
    return true;
  }

  @Mutation(() => Boolean)
  signUp(@Args('data') data: string) {
    // this.authKafkaProducer.sendMessageEvent(data);
    this.authService.create();
    return true;
  }
}
