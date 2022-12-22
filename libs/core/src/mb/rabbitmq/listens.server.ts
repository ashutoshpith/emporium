import { INestApplication, Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { IRmq } from './rmq.interface';
import { RmqServer } from './rmq.server';

export const listenRmqServer = async (
  app: INestApplication,
  rmqCargo: IRmq,
) => {
  const logger = new Logger(listenRmqServer.name);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new RmqServer({
      urls: [process.env.RMQ_URL],
      queue: rmqCargo.queueName,
      noAck: true,
      queueOptions: {
        durable: true,
        exchangeType: rmqCargo.exchangeType,
        exchange: rmqCargo.exchange,
        routeKey: rmqCargo.routeKey,
      },
    }),
  });
  await app.startAllMicroservices();
  logger.log('Rmq Server Started');
};
