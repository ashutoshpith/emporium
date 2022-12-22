import { Injectable, Logger, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { IEventSubscriberHandler } from './subscriber.interface';
import { EventSubscriberMap } from './subscriber.map';

@Injectable()
export class EventSubscriberManager {
  private readonly logger = new Logger(EventSubscriberManager.name);
  private instances = new Map<
    Type<IEventSubscriberHandler>,
    IEventSubscriberHandler
  >();

  constructor(private moduleRef: ModuleRef) {}

  async run(event: string, payload: any): Promise<void> {
    const handler = EventSubscriberMap.get(event);

    if (handler) {
      if (!this.instances.has(handler)) {
        this.instances.set(
          handler,
          this.moduleRef.get(handler, { strict: false }),
        );
      }
      this.logger.log(`Event: ${event} -> Subscriber: ${handler.name}`);
      await this.instances.get(handler).handle(payload);
    }
    return;
  }
}
