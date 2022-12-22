import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducer.name);
  constructor(public client: ClientKafka, public topic: string) {}

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
