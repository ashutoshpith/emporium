import { Event, IEvent } from '@ocoda/event-sourcing';

@Event('play-created')
export class PlayCreatedEvent implements IEvent {
  constructor(public playId: string, public name: string) {}
}

@Event(PlayUpdatedEvent.name)
export class PlayUpdatedEvent implements IEvent {
  constructor(public playId: string, public name: string) {}
}
