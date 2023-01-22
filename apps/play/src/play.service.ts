import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PlayService implements OnModuleInit {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    // console.log(this.tpService.getTp());
    // this.eventStore.storeEvent(new PlayCreatedEvent(',e ', 'xdf'));
  }
}
