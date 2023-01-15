import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { KafkaClientService } from './kafka-clinet.service';
import { TKafka } from './kafka.type';

@Module({})
export class KafkaClientModule {
  static connect(cargo: TKafka): DynamicModule {
    return {
      global: true,
      module: KafkaClientModule,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        {
          provide: KafkaClientService,
          useValue: new KafkaClientService({
            client: {
              brokers: process.env.KAFKA_URL.split(','),
              clientId: cargo.clientId,
              ssl: true,
              connectionTimeout: 40000,
              sasl: {
                mechanism: process.env.KAFKA_SASL_MECHANISM as any, // scram-sha-256 or scram-sha-256
                username: process.env.KAFKA_USER_NAME,
                password: process.env.KAFKA_PASSWORD,
              },
              // logLevel: logLevel.DEBUG,
            },
            consumer: {
              allowAutoTopicCreation: false,
              groupId: cargo.groupId,
            },
          }),
        },
      ],
      exports: [KafkaClientService],
    };
  }
}
