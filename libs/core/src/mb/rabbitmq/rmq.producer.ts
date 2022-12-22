import { Injectable, Logger, OnModuleInit, Optional } from '@nestjs/common';
import { RmqClient } from './rmq.client';

@Injectable()
export class RmqProducer implements OnModuleInit {
  private readonly logger = new Logger(RmqProducer.name);
  constructor(
    readonly rmqClient: RmqClient,
    @Optional() public pattern?: any,
  ) {}

  onModuleInit() {
    this.rmqClient.connect();
  }

  sendEvent(data: any) {
    this.logger.log('sendEvent');
    if (this.pattern) {
      this.rmqClient.pattern = this.pattern;
    }
    const res = this.rmqClient.emit(this.rmqClient.pattern, data);
    return res;
  }

  async sendMessage(data: any) {
    this.logger.log('sendMessage');
    const observableValues = await this.rmqClient
      .send('notifications', data)
      .toPromise();

    console.log('just ', observableValues);

    return observableValues;
  }
}
