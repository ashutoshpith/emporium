import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KafkaClientService } from './kafka-clinet.service';

export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  readonly logger = new Logger(KafkaProducer.name);
  constructor(protected client: KafkaClientService, public topic: string) {}

  async onModuleDestroy() {
    await this.client.close();
  }

  async onModuleInit() {
    await this.client.connect();
  }

  sendMessageEvent(data: any): void {
    console.log('here ', this.topic, data);

    this.client.emit<boolean>(this.topic, data);
    this.logger.log(`sendMessageEvent ${this.topic}`);
    return;
  }

  async sendMessage(data: any) {
    return this.client.send(this.topic, data);
  }
}
