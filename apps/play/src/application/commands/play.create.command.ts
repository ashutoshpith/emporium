import {
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@ocoda/event-sourcing';
import { PlayAggregate, PlayId } from '../../domain/models';
import { PlayRepo } from '../repos';

export class PlayCreateCommand implements ICommand {
  constructor(public readonly name: string) {}
}

@CommandHandler(PlayCreateCommand)
export class PlayCreateCommandHandler implements ICommandHandler {
  constructor(private readonly playRepo: PlayRepo) {}

  async execute(command: PlayCreateCommand): Promise<any> {
    const playId = PlayId.generate();
    const play = PlayAggregate.createPlay(playId, command.name);
    console.log('play', play.name);

    await this.playRepo.save(play);
    await this.playRepo.create(playId.value, { name: play.name });
    console.log('palu', play);
    return playId;
  }
}
