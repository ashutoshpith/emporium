import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EventSubscriberManager,
  MessageSubscriberManager,
} from '../subscriber';
import { RmqClient } from './rmq.client';
import { IRmq } from './rmq.interface';
import { RmqProducer } from './rmq.producer';

@Module({})
export class RmqModule {
  static forRoot(cargo: IRmq): DynamicModule {
    return {
      module: RmqModule,
      global: true,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        {
          provide: RmqClient,
          useValue: new RmqClient(
            {
              queue: cargo.queueName,
              urls: [process.env.RMQ_URL],
              noAck: true,
              persistent: true,
              prefetchCount: 20,
              queueOptions: {
                durable: true,
                exchange: cargo.exchange,
                routeKey: cargo.routeKey,
                exchangeType: cargo.exchangeType,
              },
            },
            cargo.pattern,
          ),
        },
        RmqProducer,
        EventSubscriberManager,
        MessageSubscriberManager,
      ],
      exports: [
        RmqClient,
        RmqProducer,
        EventSubscriberManager,
        MessageSubscriberManager,
      ],
    };
  }
}
