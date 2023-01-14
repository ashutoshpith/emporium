import { KafkaClientModule } from '@core/core/message-broker';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { AuthKafkaProducer } from './auth-kafka.producer';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaClientModule.connect({
      name: 'Auth',
      // topic: process.env.IDENTITY_TOPIC,
      clientId: process.env.IDENTITY_KAFKA_CLIENT_ID,
      groupId: process.env.IDENTITY_KAFKA_GROUP_ID,
    }),
  ],
  providers: [AuthResolver, AuthKafkaProducer],
})
export class AuthModule {}
