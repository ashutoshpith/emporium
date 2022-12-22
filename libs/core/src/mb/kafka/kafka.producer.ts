import { ClientKafka, KafkaOptions } from '@nestjs/microservices';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';

export class KafkaProducer extends ClientKafka {
  private readonly options_crypto: KafkaOptions['options'];
  readonly brokers: string[];
  readonly client: any;
  readonly consumer: any;

  constructor(options: KafkaOptions['options']) {
    super(options);

    this.options_crypto = options;
    this.client = this.getOptionsProp(this.options_crypto, 'client');
    this.consumer = this.getOptionsProp(this.options_crypto, 'consumer');

    this.initializeSerializer(options);
    this.initializeDeserializer(options);
  }
}
