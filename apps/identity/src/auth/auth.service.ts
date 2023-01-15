import { DomainEventPublisher } from '@core/core/event-sourcing/domain-event-publisher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // private readonly authRepo: AuthcRepo, // private readonly domainEventPublisher: DomainEventPublisher,

  async create() {
    // const _id = this.authRepo.newId();
    // const model = this.domainEventPublisher.mergeObjectContext(
    //   await this.authRepo.findFromEventStore(_id),
    // );
    // const input = {
    //   firstName: 'ashu',
    //   lastName: 'singh',
    // };
    // model.createEntry(_id, input);
    // await this.authRepo.create(_id, model.state);
    // model.commit();
  }
}
