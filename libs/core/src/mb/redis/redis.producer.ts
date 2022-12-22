import { Inject, Injectable } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';

@Injectable()
export class RedisProducer {
  constructor(@Inject('REDIS_SERVICE') private client: ClientRedis) {}

  sendMessage() {
    console.log('is hit');

    this.client.send('notifications', 'hello');
  }
}
