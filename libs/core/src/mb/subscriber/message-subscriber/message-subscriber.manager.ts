import { Injectable, Logger, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IMessageSubscriberEventHandler } from './message-subscriber.interface';
import { MessageSubscriberMap } from './message-subscriber.map';

@Injectable()
export class MessageSubscriberManager {
  private readonly logger = new Logger(MessageSubscriberManager.name);
  private instances = new Map<
    Type<IMessageSubscriberEventHandler>,
    IMessageSubscriberEventHandler
  >();

  constructor(private moduleRef: ModuleRef) {}

  async messageRun(event: string, payload: any) {
    const handler = MessageSubscriberMap.get(event);

    if (handler) {
      if (!this.instances.has(handler)) {
        this.instances.set(
          handler,
          this.moduleRef.get(handler, { strict: false }),
        );
      }
      this.logger.log(`Event: ${event} -> Subscriber: ${handler.name}`);
      return await this.instances.get(handler).handle(payload);
    }
  }
}
