import {
  EventEnvelope,
  EventPublisher,
  IEvent,
  IEventPublisher,
} from '@ocoda/event-sourcing';

@EventPublisher()
export class CustomEventPublisher implements IEventPublisher {
  async publish(envelope: EventEnvelope<IEvent>): Promise<void> {
    console.log('custom publisher ', envelope);
  }
}
