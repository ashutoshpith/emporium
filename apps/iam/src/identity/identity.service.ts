import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IdentityCreateCommand } from './command/identity-create.command';
import { IdentityUpdateCommand } from './command/identity-update.command';

@Injectable()
export class IdentityService {
  constructor(private readonly commandBus: CommandBus) {}
  async create() {
    await this.commandBus.execute(
      new IdentityCreateCommand('Ashutosh', 'Singh'),
    );
    return false;
  }

  async update() {
    await this.commandBus.execute(
      new IdentityUpdateCommand('63c5d43edd69cdea49aa8456', '89394994'),
    );
    return true;
  }
}
