import { StorableEvent } from 'event-sourcing-nestjs';

export abstract class DomainEvent extends StorableEvent {
  constructor(public triggeredBy: string) {
    super();
  }
}

export class AuthEvent extends DomainEvent {
  eventAggregate: string = AuthEvent.name;
  eventVersion = 1;
  constructor(
    triggeredBy: string,
    public id: string,
    public input: any,
    public changes: any[],
    public updatedAt = new Date(),
    public lastAccessAt = new Date(),
  ) {
    super(triggeredBy);
  }
}
