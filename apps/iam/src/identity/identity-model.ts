import {
  IdentityCreatedEvent,
  IdentityUpdatedEvent,
} from '@core/core/event-sourcing/domain-event';
import { IModel, IModelState } from '@core/core/model';
import { AggregateRoot } from '@nestjs/cqrs';

export interface IIdentityModel extends IModelState {
  firstName: string;
  lastName: string;
  phnNumber: string;
}

export class IdentityModel
  extends AggregateRoot
  implements IModel<IIdentityModel>
{
  // private readonly logger = new Logger(IdentityModel.name);
  isNew = true;
  state: IIdentityModel = {} as any;

  constructor(_id: string) {
    super();
    this.autoCommit = true;
    this.state._id = _id;
  }

  create(triggeredBy: string, input: any): void {
    // this.logger.log('createEntry');
    this.apply(
      new IdentityCreatedEvent(triggeredBy, this.state._id, input, []),
    );
    return;
  }

  onIdentityCreatedEvent(event: IdentityCreatedEvent) {
    this.isNew = false;
    this.state.lastName = event.input.firstName;
    this.state.firstName = event.input.lastName;
  }

  updateEntry(triggeredBy: string, input: any): boolean {
    this.apply(
      new IdentityUpdatedEvent(triggeredBy, this.state._id, input, []),
    );
    return true;
  }

  onIdentityUpdatedEvent(event: IdentityUpdatedEvent) {
    this.state.phnNumber = event.input.phnNumber;
  }
}
