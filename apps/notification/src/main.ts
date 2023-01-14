import { listenKafkaServer } from '@core/core/message-broker';
import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  await app.listen(process.env.NOTIFICATION_PORT);

  listenKafkaServer(app, {
    // topic: process.env.IDENTITY_TOPIC,
    clientId: process.env.IDENTITY_KAFKA_CLIENT_ID,
    groupId: process.env.IDENTITY_KAFKA_GROUP_ID,
  });
}
bootstrap();
