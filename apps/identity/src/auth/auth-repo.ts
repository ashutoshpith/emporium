import { BaseRepo } from '@core/core/db';
import { Injectable } from '@nestjs/common';
import { TAuthenticateDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticateRepo extends BaseRepo<TAuthenticateDocument> {
  constructor(@InjectModel('Authc') model: Model<TAuthenticateDocument>) {
    console.log('here ', model);

    super(model);
  }
  // private readonly eventStore: EventStore,

  // async findFromEventStore(_id: string): Promise<AuthModel> {
  //   // const model = new AuthModel(_id);
  //   // const getEvents = await this.eventStore.getEvents(AuthModel.name, _id);
  //   // const events = getEvents.events;
  //   // model.loadFromHistory(events);
  //   // return model;
  //   return;
  // }
}
