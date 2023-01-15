import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KafkaClientService } from './kafka-clinet.service';

export enum KafkaPartitionService {
  IDENTITY_SERVICE = 0,
  NOTIFICATION_SERVICE = 1,
}

export const KafkaServicePartition = {
  [0]: 'IDENTITY_SERVICE',
  [1]: 'NOTIFICATION_SERVICE',
};
export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  readonly logger = new Logger(KafkaProducer.name);
  constructor(protected client: KafkaClientService, public topic: string) {}

  async onModuleDestroy() {
    await this.client.close();
  }

  async onModuleInit() {
    await this.client.connect();
  }

  sendMessageEvent(data: any, partition?: KafkaPartitionService): void {
    console.log('here ', this.topic, data);
    const message = {
      key: KafkaServicePartition[partition] ?? 'IDENTITY_SERVICE',
      value: data,
      partition,
    };
    console.log('messgae', message);

    this.client.emit<boolean>(this.topic, message);
    this.logger.log(`sendMessageEvent ${this.topic}`);
    return;
  }

  async sendMessage(data: any) {
    return this.client.send(this.topic, data);
  }
}
