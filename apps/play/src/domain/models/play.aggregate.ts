import { Aggregate, AggregateRoot, Id } from '@ocoda/event-sourcing';
import { PlayCreatedEvent, PlayUpdatedEvent } from '../events';

export interface IPlayModel {
  name: string;
}
export class PlayId extends Id {}

@Aggregate({ streamName: 'play' })
export class PlayAggregate extends AggregateRoot {
  public id: PlayId;
  public name: string;

  public static createPlay(id: PlayId, name: string) {
    const play = new PlayAggregate();
    play.id = id;
    play.name = name;

    play.applyEvent(new PlayCreatedEvent(id.value, name));
    return play;
  }

  updatePlay(id: string, name: string) {
    this.applyEvent(new PlayUpdatedEvent(id, name));
  }

  onPlayUpdatedEvent(event: PlayUpdatedEvent) {
    this.name = event.name;
  }
}
