import { ClientKafka, KafkaOptions } from '@nestjs/microservices';

export class KafkaClientService extends ClientKafka {
  constructor(public options: KafkaOptions['options'], public topic?: string) {
    super(options);
  }

  setParti() {
    this.setConsumerAssignments({} as any);
  }
}
