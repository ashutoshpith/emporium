import { ClientKafka, KafkaOptions } from '@nestjs/microservices';

export class KafkaClientService extends ClientKafka {
  constructor(options: KafkaOptions['options']) {
    console.log('Server ', options);

    super(options);
  }

  setParti() {
    this.setConsumerAssignments({} as any);
  }
}
