import { IdentityCreatedEvent } from '@core/core/event-sourcing/domain-event';
import { DomainEventPublisher } from '@core/core/event-sourcing/domain-event-publisher';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IdentityCreateCommand } from '../command/identity-create.command';
import { IdentityRepo } from '../identity.repo';

@CommandHandler(IdentityCreateCommand)
export class IdentityCreateHandler
  implements ICommandHandler<IdentityCreateCommand>
{
  constructor(
    private readonly identityRepo: IdentityRepo,
    private readonly domainEventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: IdentityCreateCommand) {
    const _id = this.identityRepo.newId();
    const model = this.domainEventPublisher.mergeObjectContext(
      await this.identityRepo.findFromEventStore(_id),
    );
    console.log('Model 1', model);
    model.create(_id, command);
    console.log('model 2', model);
    await this.identityRepo.create(_id, model.state);

    model.commit();
    model.publish(new IdentityCreatedEvent('me', _id, model.state, []));
    return;
  }
}
