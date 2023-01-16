import { DomainEventSourcingModule } from '@core/core/message-broker';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';
import { modules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...modules,
    MongooseModule.forRoot('mongodb://localhost:27017/iam'),
    DomainEventSourcingModule.forRoot({
      name: 'Auth',
      // topic: process.env.IDENTITY_TOPIC,
      clientId: process.env.IDENTITY_KAFKA_CLIENT_ID,
      groupId: process.env.IDENTITY_KAFKA_GROUP_ID,
      topic: 'identity_topic',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      include: [...modules],
      introspection: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule {}
