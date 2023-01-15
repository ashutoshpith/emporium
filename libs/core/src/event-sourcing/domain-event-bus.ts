// import { EventStore } from 'event-sourcing-nestjs';
import { Injectable } from '@nestjs/common';
import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';
import { KafkaProducer } from '../message-broker/kafka.producer';
import { DomainEvent } from './domain-event';
import { EventStore } from './es';

@Injectable()
export class DomainEventBus implements IEventBus {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
    private readonly kafkaProducer: KafkaProducer,
  ) {}

  publish<T extends IEvent>(event: T) {
    const domainEvent = event as any as DomainEvent;
    if (
      domainEvent.id === undefined ||
      domainEvent.eventAggregate === undefined ||
      domainEvent.eventVersion === undefined
    ) {
      throw new Error('Events must extends from domainEvent');
    }
    const data = {
      payload: domainEvent,
      event: domainEvent.eventName,
    };

    this.eventStore
      .storeEvent(domainEvent)
      .then(() => this.kafkaProducer.emitEvent(data))
      .then(() => this.eventBus.publish(event));
  }
  publishAll(events: IEvent[]) {
    (events || []).forEach((event) => this.publish(event));
  }
}
