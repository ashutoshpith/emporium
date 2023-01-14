import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class NotificationController {
  @EventPattern('identity_topic')
  getHello(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('hello in', context, message);

    return true;
  }
}
