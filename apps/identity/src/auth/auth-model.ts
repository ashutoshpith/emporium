import { AuthEvent } from '@core/core/event-sourcing/domain-event';
import { IModel, IModelState } from '@core/core/model';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

// export interface IAuthModel extends IModelState {
//   firstName: string;
//   lastName: string;
// }

// export class AuthModel extends AggregateRoot implements IModel<IAuthModel> {
//   private readonly logger = new Logger(AuthModel.name);
//   isNew = true;
//   state: IAuthModel = {} as any;

//   constructor(_id: string) {
//     super();
//     this.state._id = _id;
//   }

//   createEntry(triggeredBy: string, input: any): void {
//     this.logger.log('createEntry');
//     this.apply(new AuthEvent(triggeredBy, this.state._id, input, []));
//   }

//   onAuthEvent(event: AuthEvent) {
//     this.state.firstName = event.input.firstName;
//     this.state.lastName = event.input.lastName;
//   }
// }
