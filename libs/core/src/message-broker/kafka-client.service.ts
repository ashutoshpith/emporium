import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TKafka } from './kafka.type';

@Module({})
export class KafkaClientService {
  static connect(cargo: TKafka): DynamicModule {
    return {
      global: true,
      module: KafkaClientService,
      imports: [
        ClientsModule.register([
          {
            transport: Transport.KAFKA,
            name: cargo.name,
            options: {
              client: {
                brokers: process.env.KAKFA_URL.split(','),
                clientId: cargo.clientId,
                ssl: true,
                sasl: {
                  mechanism: process.env.KAFKA_SASL_MECHANISM as any, // scram-sha-256 or scram-sha-256
                  username: process.env.KAFKA_USER_NAME,
                  password: process.env.KAFKA_PASSWORD,
                },
              },
              consumer: {
                groupId: cargo.groupId,
                // allowAutoTopicCreation: true,
              },
            },
          },
        ]),
      ],
      providers: cargo?.providers,
      exports: cargo?.providers,
    };
  }
}
