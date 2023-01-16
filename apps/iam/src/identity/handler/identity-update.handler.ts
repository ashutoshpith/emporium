import { DomainEventPublisher } from '@core/core/event-sourcing/domain-event-publisher';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IdentityUpdateCommand } from '../command/identity-update.command';
import { IdentityRepo } from '../identity.repo';

@CommandHandler(IdentityUpdateCommand)
export class IdentityUpdateHandler
  implements ICommandHandler<IdentityUpdateCommand>
{
  constructor(
    private readonly repository: IdentityRepo,
    private readonly publisher: DomainEventPublisher,
  ) {}

  async execute(command: IdentityUpdateCommand) {
    const { _id, phnNumber } = command;
    const model = this.publisher.mergeObjectContext(
      await this.repository.findFromEventStore(_id),
    );

    model.updateEntry('me', { phnNumber });
    await this.repository.updateOne(
      {
        _id,
      },
      model.state,
    );
    // model.commit();

    return;
  }
}
