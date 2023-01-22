import { ISnapshot, Snapshot, SnapshotHandler } from '@ocoda/event-sourcing';
import { PlayAggregate, PlayId } from './play.aggregate';

@Snapshot(PlayAggregate, { name: 'play', interval: 5 })
export class PlayAggregateSnapshotHandler extends SnapshotHandler<PlayAggregate> {
  serialize({ id, name }: PlayAggregate) {
    return {
      id: id.value,
      name: name,
    };
  }
  deserialize({ id, name }: ISnapshot<PlayAggregate>): PlayAggregate {
    const play = new PlayAggregate();
    play.id = PlayId.from(id);

    play.name = name;
    return play;
  }
}
