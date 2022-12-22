import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TKafka } from './kafka.type';

export const listenKafkaServer = async (
  app: INestApplication,
  cargo: TKafka,
): Promise<void> => {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: cargo.clientId,
        brokers: process.env.KAKFA_URL.split(','),
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
  });
  await app.startAllMicroservices();
};
