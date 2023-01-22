import {
  EventEnvelope,
  EventHandler,
  IEventHandler,
} from '@ocoda/event-sourcing';
import { PlayCreatedEvent } from './play-created.event';

@EventHandler(PlayCreatedEvent)
export class PlayCreatedEventHandler implements IEventHandler {
  handle({ metadata }: EventEnvelope<PlayCreatedEvent>) {
    console.log('event trtiggr ', metadata);

    return;
  }
}
