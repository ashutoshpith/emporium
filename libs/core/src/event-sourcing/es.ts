import { Logger } from '@nestjs/common';
import {
  EventSourcingOptions,
  StorableEvent,
} from '@berniemac/event-sourcing-nestjs';
import * as eventstore from 'eventstore';
import * as url from 'url';

export class EventStores {
  private readonly logger = new Logger(EventStores.name);
  private readonly eventstore;
  private readonly config;
  private eventStoreLaunched = false;

  constructor() {
    // console.log('here ', options);

    // let ssl = false;

    // this.config = options.aggregateSnapshot || {};

    // const parsed = url.parse(options.mongoURL, true);
    // console.log('parsed ', parsed);

    // if (
    //   parsed.query &&
    //   parsed.query.ssl !== undefined &&
    //   parsed.query.ssl === 'true'
    // ) {
    //   ssl = true;
    // }

    // this.eventstore = eventstore({
    //   type: 'mongodb',
    //   host: 'localhost', // optional
    //   port: 27017, // optional
    //   dbName: 'eventstore', // optional
    //   eventsCollectionName: 'events', // optional
    //   snapshotsCollectionName: 'snapshots', // optional
    //   transactionsCollectionName: 'transactions', // optional
    //   timeout: 10000,
    // useNewUrlParser: true,
    // keepAlive: true,
    // useUnifiedTopology: true,

    // type: 'redis',
    // host: 'localhost', // optional
    // port: 6379, // optional
    // db: 0, // optional
    // prefix: 'eventstore', // optional
    // eventsCollectionName: 'events', // optional
    // snapshotsCollectionName: 'snapshots', // optional
    // timeout: 10000,
    // });

    this.eventstore.init((err) => {
      if (err) {
        throw err;
      }
      this.eventStoreLaunched = true;
    });
    this.logger.verbose('Connection Established');
  }

  public isInitiated(): boolean {
    this.logger.verbose('isInitiated');

    return this.eventStoreLaunched;
  }

  public getSnapshotInterval(aggregate: string): number | null {
    this.logger.verbose('getSnapshotInterval');

    return this.config ? this.config[aggregate] : null;
  }

  public async createSnapshot(
    aggregate: string,
    id: string,
    revision: number,
    state: string,
  ): Promise<any> {
    this.logger.verbose('createSnapshot');

    return new Promise<any>((resolve) => {
      this.eventstore.createSnapshot(
        {
          streamId: this.getAggregateId(aggregate, id),
          data: state,
          revision: revision,
        },
        function (err) {
          // snapshot saved
        },
      );
    });
  }

  public async getEvents(
    aggregate: string,
    id: string,
  ): Promise<{ events: StorableEvent[]; snapshot: any; lastRevision: number }> {
    this.logger.verbose('getEvents');

    return new Promise<{
      events: StorableEvent[];
      snapshot: any;
      lastRevision: number;
    }>((resolve) => {
      this.eventstore.getFromSnapshot(
        this.getAggregateId(aggregate, id),
        (err, snapshot, stream) => {
          const events = stream.events.map((event) => {
            return this.getStorableEventFromPayload(event);
          });

          resolve({
            events: events,
            snapshot: snapshot?.data,
            lastRevision: stream.lastRevision,
          });
        },
      );
    });
  }

  public async getEvent(index: number): Promise<StorableEvent> {
    this.logger.verbose('getEvent');

    return new Promise<StorableEvent>((resolve, reject) => {
      this.eventstore.getEvents(index, 1, (err, events) => {
        if (events.length > 0) {
          resolve(this.getStorableEventFromPayload(events[0]));
        } else {
          resolve(null);
        }
      });
    });
  }

  public async storeEvent<T extends StorableEvent>(event: T): Promise<void> {
    this.logger.verbose('storeEvent');

    return new Promise<void>((resolve, reject) => {
      if (!this.eventStoreLaunched) {
        reject('Event Store not launched!');
        return;
      }
      this.eventstore.getEventStream(
        {
          aggregateId: this.getAggregateId(event.eventAggregate, event.id),
          aggregate: event.eventAggregate,
        },
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }

          stream.addEvent(event);
          stream.commit((commitErr) => {
            if (commitErr) {
              reject(commitErr);
            }
            resolve();
          });
        },
      );
    });
  }

  // Monkey patch to obtain event 'instances' from db
  private getStorableEventFromPayload(event: any): StorableEvent {
    this.logger.verbose('getStorableEventFromPayload');

    const { payload } = event;
    const eventPlain = payload;
    eventPlain.constructor = {
      name: eventPlain.eventName,
    };

    const transformedEvent = Object.assign(
      Object.create(eventPlain),
      eventPlain,
    );
    transformedEvent.meta = {
      revision: event.streamRevision,
    };
    return transformedEvent;
  }

  private getAggregateId(aggregate: string, id: string): string {
    this.logger.verbose('getAggregateId');

    return aggregate + '-' + id;
  }
}
