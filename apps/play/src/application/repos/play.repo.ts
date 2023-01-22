import { BaseRepo } from '@core/core/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregateRoot,
  EventStore,
  EventStream,
  Id,
} from '@ocoda/event-sourcing';
import { Model } from 'mongoose';
import {
  PlayAggregate,
  PlayAggregateSnapshotHandler,
  PlayId,
} from '../../domain/models';
import { Play, TPlay } from '../schema';

@Injectable()
export class PlayRepo extends BaseRepo<TPlay> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly playSnapshotHandler: PlayAggregateSnapshotHandler,
    @InjectModel(Play.name) model: Model<TPlay>,
  ) {
    super(model);
  }

  async getById(id: PlayId): Promise<PlayAggregate> {
    const eventStream = EventStream.for<PlayAggregate>(PlayAggregate, id);

    const play = await this.playSnapshotHandler.load(id);

    const eventCursor = this.eventStore.getEvents(eventStream, {
      fromVersion: play.version + 1,
    });

    await play.loadFromHistory(eventCursor);

    if (play.version < 1) {
      //   throw new playNotFoundException(playId.value);
      throw new NotFoundException(id.value);
    }

    return play;
  }

  async commit(play: PlayAggregate): Promise<void> {
    const events = play.commit();
    const stream = EventStream.for<PlayAggregate>(PlayAggregate, play.id);

    await Promise.all([
      this.playSnapshotHandler.save(play.id, play),
      this.eventStore.appendEvents(stream, play.version, events),
    ]);
  }
}
