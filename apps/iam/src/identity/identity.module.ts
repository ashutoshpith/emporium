import { KafkaClientModule } from '@core/core/message-broker';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityRepo } from './identity.repo';
import { IdentityResolver } from './identity.resolver';
import { Identity, IdentitySchema } from './identity.schema';
import { IdentityService } from './identity.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forFeature([
      {
        name: Identity.name,
        schema: IdentitySchema,
      },
    ]),
    KafkaClientModule.forRoot({
      name: 'Auth',
      // topic: process.env.IDENTITY_TOPIC,
      clientId: process.env.IDENTITY_KAFKA_CLIENT_ID,
      groupId: process.env.IDENTITY_KAFKA_GROUP_ID,
      topic: 'identity_topic',
    }),
    // KafkaClientModule.forFeature(),
  ],
  providers: [IdentityResolver, IdentityRepo, IdentityService],
  exports: [],
})
export class IdentityModule {}
