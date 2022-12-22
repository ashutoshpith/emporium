import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisProducer } from './redis.producer';

@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      imports: [
        ClientsModule.register([
          {
            name: 'REDIS_SERVICE',
            transport: Transport.REDIS,
            options: {
              url: 'localhost:6379',
            },
          },
        ]),
      ],
      providers: [RedisProducer],
      exports: [RedisProducer],
    };
  }
}
