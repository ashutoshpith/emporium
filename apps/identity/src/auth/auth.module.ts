import { KafkaClientModule } from '@core/core/message-broker';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticateRepo } from './auth-repo';
import { AuthResolver } from './auth.resolver';
import { Authenticate, AuthenticateSchema } from './auth.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forFeature(
      [
        {
          name: Authenticate.name,
          schema: AuthenticateSchema,
        },
      ],
      'auth-con',
    ),
    // KafkaClientModule.forRoot({
    //   name: 'Auth',
    //   // topic: process.env.IDENTITY_TOPIC,
    //   clientId: process.env.IDENTITY_KAFKA_CLIENT_ID,
    //   groupId: process.env.IDENTITY_KAFKA_GROUP_ID,
    //   topic: 'identity_topic',
    // }),
    // KafkaClientModule.forFeature(),
  ],
  providers: [AuthResolver, AuthService, AuthenticateRepo],
  // exports: [AuthcRepo],
})
export class AuthenticateModule {}
