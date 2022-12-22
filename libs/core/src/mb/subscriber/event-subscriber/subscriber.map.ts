import { Type } from '@nestjs/common';
import { IEventSubscriberHandler } from './subscriber.interface';

export class EventSubscriberMap {
  private static handlers = new Map<string, Type<IEventSubscriberHandler>>();

  static add(name: string, handler: Type<IEventSubscriberHandler>) {
    EventSubscriberMap.handlers.set(name, handler);
  }

  static get(name: string): Type<IEventSubscriberHandler> {
    return EventSubscriberMap.handlers.get(name);
  }
}
