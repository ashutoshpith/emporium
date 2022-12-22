import { Type } from '@nestjs/common';
import { IMessageSubscriberEventHandler } from './message-subscriber.interface';

export class MessageSubscriberMap {
  private static handlers = new Map<
    string,
    Type<IMessageSubscriberEventHandler>
  >();

  static add(name: string, handler: Type<IMessageSubscriberEventHandler>) {
    MessageSubscriberMap.handlers.set(name, handler);
  }

  static get(name: string): Type<IMessageSubscriberEventHandler> {
    return MessageSubscriberMap.handlers.get(name);
  }
}
