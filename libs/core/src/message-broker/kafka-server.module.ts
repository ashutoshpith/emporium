import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { KafkaServerService } from './kafka-server.service';
import { TKafka } from './kafka.type';

export const listenKafkaServer = async (
  app: INestApplication,
  cargo: TKafka,
): Promise<void> => {
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaServerService({
      client: {
        clientId: cargo.clientId,
        brokers: process.env.KAFKA_URL.split(','),
        ssl: true,
        sasl: {
          mechanism: process.env.KAFKA_SASL_MECHANISM as any, // scram-sha-256 or scram-sha-256
          username: process.env.KAFKA_USER_NAME,
          password: process.env.KAFKA_PASSWORD,
        },
        connectionTimeout: 40000,
        // logLevel: logLevel.DEBUG,
      },
      consumer: {
        groupId: cargo.groupId,
        allowAutoTopicCreation: true,
      },
    }),
  });
  await app.startAllMicroservices();
};
