import { ICommand } from '@nestjs/cqrs';

export class IdentityUpdateCommand implements ICommand {
  constructor(public readonly _id: string, public readonly phnNumber: string) {}
}
