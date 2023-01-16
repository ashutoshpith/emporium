import { IdentityModel } from 'apps/iam/src/identity/identity-model';
import { StorableEvent } from '@berniemac/event-sourcing-nestjs';

export abstract class DomainEvent extends StorableEvent {
  constructor(public triggeredBy: string) {
    super();
  }
}

export class IdentityCreatedEvent extends StorableEvent {
  eventAggregate: string = IdentityModel.name;
  eventVersion = 1;
  constructor(
    public triggeredBy: string,
    public id: string,
    public input: any,
    public changes: any[],
    public updatedAt = new Date(),
    public lastAccessAt = new Date(),
  ) {
    super();
  }
}

export class IdentityUpdatedEvent extends StorableEvent {
  eventAggregate = IdentityModel.name;
  eventVersion = 1;
  constructor(
    public triggeredBy: string,
    public id: string,
    public input: any,
    public changes: any[],
    public updatedAt = new Date(),
    public lastAccessAt = new Date(),
  ) {
    super();
  }
}
