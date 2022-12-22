import { RMQ_CONSTANTS } from '../../../../../helper/src';
import { Controller, UsePipes } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { JsonParsePipe } from '@libs/core/pipes';
import { messageAcknolgement } from '../../rabbitmq/rmq-message-ack';
import { MessageSubscriberManager } from '../message-subscriber';
import { EventSubscriberManager } from '../event-subscriber';

@Controller()
export class SubscriberController {
  constructor(
    private readonly eventSubcriberManger: EventSubscriberManager,
    private readonly messageSubscribeManager: MessageSubscriberManager,
  ) {}

  @EventPattern(RMQ_CONSTANTS.CRYPTO_PATTERN)
  @UsePipes(new JsonParsePipe())
  async handleSubsriber(
    @Payload() data: Record<string, unknown>,
    @Ctx() ctx: RmqContext,
  ) {
    let eventname = '';
    try {
      const { eventName } = data;
      eventname = eventName as string;
      await this.eventSubcriberManger.run(eventname, data);

      messageAcknolgement(ctx);
    } catch (error) {
      console.log(`Error On ${eventname} Subscriber - `, error);
    }
  }

  @MessagePattern('notifications')
  async handleMessage(
    @Payload() data: Record<string, unknown>,
    @Ctx() ctx: RmqContext,
  ) {
    let eventname = '';

    try {
      console.log('Message Recived');

      const { eventName } = data;
      eventname = eventName as string;

      const datax = await this.messageSubscribeManager.messageRun(
        eventname,
        data,
      );
      messageAcknolgement(ctx);
      return datax;
    } catch (error) {
      console.log(`Error On ${eventname} Subscriber - `, error);
    }
  }
}
