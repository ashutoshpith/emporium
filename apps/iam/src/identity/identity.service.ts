import { DomainEventPublisher } from '@core/core/event-sourcing/domain-event-publisher';
import { Injectable } from '@nestjs/common';
import { IdentityRepo } from './identity.repo';

@Injectable()
export class IdentityService {
  constructor(
    private readonly identityRepo: IdentityRepo,
    private readonly domainEventPublisher: DomainEventPublisher,
  ) {}
  async create() {
    const _id = this.identityRepo.newId();
    const model = this.domainEventPublisher.mergeObjectContext(
      await this.identityRepo.findFromEventStore(_id),
    );
    console.log('Model ', model);

    const input = {
      firstName: 'ashu',
      lastName: 'singh',
    };
    model.createEntry(_id, input);
    await this.identityRepo.create(_id, model.state);
    model.commit();
  }
}
