import {
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@ocoda/event-sourcing';
import { PlayId } from '../../domain/models';
import { PlayRepo } from '../repos';

export class PlayUpdateCommand implements ICommand {
  constructor(public readonly id: string, public readonly name: string) {}
}

@CommandHandler(PlayUpdateCommand)
export class PlayUpdateCommandHandler implements ICommandHandler {
  constructor(private readonly playRepo: PlayRepo) {}

  async execute(command: PlayUpdateCommand): Promise<any> {
    const playId = PlayId.from(command.id);

    const play = await this.playRepo.getById(playId);

    play.updatePlay(playId.value, command.name);

    await this.playRepo.updateOne({ _id: playId.value }, { name: play.name });
    await this.playRepo.commit(play);
    return playId;
  }
}
