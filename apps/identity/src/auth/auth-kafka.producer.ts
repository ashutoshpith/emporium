import { KafkaClientService } from '@core/core/message-broker/kafka-clinet.service';
import { KafkaProducer } from '@core/core/message-broker/kafka.producer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthKafkaProducer extends KafkaProducer {
  constructor(private readonly clientKafka: KafkaClientService) {
    super(clientKafka, 'identity_topic');
  }
}
