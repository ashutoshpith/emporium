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
    model.create(_id, command);
    await this.identityRepo.create(_id, model.state);
    return;
  }
}
