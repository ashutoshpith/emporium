import { BaseRepo } from '@core/core/db';
// import { EventStore } from '@core/core/event-sourcing/es';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventStore } from '@berniemac/event-sourcing-nestjs';
import { Model } from 'mongoose';
import { IdentityModel } from './identity-model';
import { Identity, TIdentity } from './identity.schema';

@Injectable()
export class IdentityRepo extends BaseRepo<TIdentity> {
  constructor(
    private readonly eventStore: EventStore,
    @InjectModel(Identity.name) model: Model<TIdentity>,
  ) {
    super(model);
  }

  async findFromEventStore(_id: string): Promise<IdentityModel> {
    const model = new IdentityModel(_id);
    const getEvents = await this.eventStore.getEvents(IdentityModel.name, _id);
    const events = getEvents.events;
    model.loadFromHistory(events);
    return model;
  }
}
