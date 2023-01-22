import { Type } from '@nestjs/common';
import {
  ICommandHandler,
  IEventHandler,
  SnapshotHandler,
} from '@ocoda/event-sourcing';
import { PlayCreateCommandHandler } from './application/commands';
import { PlayUpdateCommandHandler } from './application/commands/play.update.command';
import { CustomEventPublisher } from './application/publishers';
import { PlayRepo } from './application/repos';
import {
  PlayCreatedEvent,
  PlayCreatedEventHandler,
  PlayUpdatedEvent,
} from './domain/events';
import { PlayAggregateSnapshotHandler } from './domain/models';

export const Events = [PlayCreatedEvent, PlayUpdatedEvent];

export const CommandHandlers: Type<ICommandHandler>[] = [
  PlayCreateCommandHandler,
  PlayUpdateCommandHandler,
];
export const SnapshotHandlers: Type<SnapshotHandler>[] = [
  PlayAggregateSnapshotHandler,
];

export const EventHandlers: Type<IEventHandler>[] = [PlayCreatedEventHandler];
export const EventPublishers = [CustomEventPublisher];

export const AggregateRepositories = [PlayRepo];
