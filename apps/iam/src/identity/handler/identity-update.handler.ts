import { IdentityUpdatedEvent } from '@core/core/event-sourcing/domain-event';
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
    console.log('model 1', model);

    model.updateEntry('me', { phnNumber });
    await this.repository.updateOne(
      {
        _id,
      },
      model.state,
    );
    console.log('model 2 ', model);

    model.commit();
    model.publish(
      new IdentityUpdatedEvent('me', model.state._id, model.state, []),
    );
    return;
  }
}
