import { KafkaProducer } from '@core/core/message-broker/kafka.producer';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdentityService } from './identity.service';

@Resolver()
export class IdentityResolver {
  constructor(
    private readonly authKafkaProducer: KafkaProducer,
    private readonly identityService: IdentityService,
  ) {}
  @Query(() => Boolean)
  async signIn() {
    // this.authKafkaProducer.emitEvent('hdshhfhsfhd');
    await this.identityService.create();
    return true;
  }

  @Mutation(() => Boolean)
  signUp() {
    return true;
  }
}
