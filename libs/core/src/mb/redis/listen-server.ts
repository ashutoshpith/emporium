import { INestApplication, Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const listenRedisServer = async (app: INestApplication) => {
  const logger = new Logger(listenRedisServer.name);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: 'localhost:6379',
    },
  });
  await app.startAllMicroservices();
  logger.log('Redis Server Started');
};
