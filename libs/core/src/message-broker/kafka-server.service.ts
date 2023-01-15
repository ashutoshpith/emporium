import { KafkaOptions, ServerKafka } from '@nestjs/microservices';

export class KafkaServerService extends ServerKafka {
  constructor(options: KafkaOptions['options']) {
    super(options);
  }
}
