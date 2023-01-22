import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@ocoda/event-sourcing';
import { PlayCreateCommand } from '../commands';
import { PlayUpdateCommand } from '../commands/play.update.command';

@Resolver()
export class PlayResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => Boolean)
  async createPlay(@Args('name') name: string) {
    const data = await this.commandBus.execute<PlayCreateCommand>(
      new PlayCreateCommand(name),
    );
    console.log('Data', data.value);

    return true;
  }

  @Mutation(() => Boolean)
  async updatePlay(@Args('_id') _id: string, @Args('name') name: string) {
    await this.commandBus.execute(new PlayUpdateCommand(_id, name));
    return true;
  }

  @Query(() => Boolean)
  heelo() {
    return true;
  }
}
