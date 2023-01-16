import { ICommand } from '@nestjs/cqrs';

export class IdentityCreateCommand implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
