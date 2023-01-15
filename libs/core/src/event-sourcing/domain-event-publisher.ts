import { Injectable } from '@nestjs/common';
import { IEvent, AggregateRoot } from '@nestjs/cqrs';
import { DomainEventBus } from './domain-event-bus';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class DomainEventPublisher {
  constructor(private readonly eventBus: DomainEventBus) {}

  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IEvent) {
        eventBus.publish(event);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    const eventBus = this.eventBus;
    console.log('in');

    object.publish = (event: IEvent) => {
      eventBus.publish(event);
    };
    return object;
  }
}
