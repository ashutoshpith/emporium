import { AuthEvent } from '@core/core/event-sourcing/domain-event';
import { IModel, IModelState } from '@core/core/model';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export interface IIdentityModel extends IModelState {
  firstName: string;
  lastName: string;
}

export class IdentityModel
  extends AggregateRoot
  implements IModel<IIdentityModel>
{
  private readonly logger = new Logger(IdentityModel.name);
  isNew = true;
  state: IIdentityModel = {} as any;

  constructor(_id: string) {
    super();
    this.state._id = _id;
  }

  createEntry(triggeredBy: string, input: any): void {
    this.logger.log('createEntry');
    this.apply(new AuthEvent(triggeredBy, this.state._id, input, []));
  }

  onAuthEvent(event: AuthEvent) {
    this.state.firstName = event.input.firstName;
    this.state.lastName = event.input.lastName;
  }
}
