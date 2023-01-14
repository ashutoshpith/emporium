import { KafkaOptions, ServerKafka } from '@nestjs/microservices';

export class KafkaServerService extends ServerKafka {
  constructor(options: KafkaOptions['options']) {
    console.log('Server ', options);

    super(options);
  }
}
