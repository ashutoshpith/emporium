import {
  AggregateRepository,
  ViewEventBus,
  ViewUpdater,
  // EventStore,
} from 'event-sourcing-nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainEventBus } from '../event-sourcing/domain-event-bus';
import { DomainEventPublisher } from '../event-sourcing/domain-event-publisher';
import { ESRepo } from '../event-sourcing/es.repo';
import { ES, ESSchema } from '../event-sourcing/es.schema';
import { KafkaClientService } from './kafka-clinet.service';
import { TKafka } from './kafka.type';
import { EventStore } from '../event-sourcing/es';
import { KafkaProducer } from './kafka.producer';

@Module({})
export class KafkaClientModule {
  static forRoot(cargo: TKafka): DynamicModule {
    const imports: any = [
      ConfigModule.forRoot({ isGlobal: true }),
      CqrsModule,
    ] as any;
    const providers = [
      DomainEventBus,
      DomainEventPublisher,
      ESRepo,
      ViewUpdater,
      ViewEventBus,
      // AggregateRepository,
      KafkaProducer,
    ] as any;
    const exports = [
      KafkaClientService,
      DomainEventBus,
      DomainEventPublisher,
      EventStore,
      ESRepo,
      ViewUpdater,
      ViewEventBus,
      KafkaProducer,

      // AggregateRepository,
    ] as any;

    imports.push(
      MongooseModule.forRoot('mongodb://localhost:27017/eventstore'),
    );
    imports.push(
      MongooseModule.forFeature([{ name: ES.name, schema: ESSchema }]),
    );

    providers.push({
      provide: EventStore,
      useValue: new EventStore(),
    });

    providers.push({
      provide: KafkaClientService,
      useValue: new KafkaClientService(
        {
          client: {
            brokers: process.env.KAFKA_URL.split(','),
            clientId: cargo.clientId,
            ssl: true,
            connectionTimeout: 100000,
            sasl: {
              mechanism: process.env.KAFKA_SASL_MECHANISM as any, // scram-sha-256 or scram-sha-256
              username: process.env.KAFKA_USER_NAME,
              password: process.env.KAFKA_PASSWORD,
            },
            // logLevel: logLevel.DEBUG,
          },
          consumer: {
            allowAutoTopicCreation: false,
            groupId: cargo.groupId,
          },
        },
        cargo.topic,
      ),
    });

    return {
      global: true,
      module: KafkaClientModule,
      imports,
      providers,
      exports,
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: KafkaClientModule,
      imports: [CqrsModule],
      providers: [
        EventStore,
        ViewUpdater,
        ViewEventBus,
        DomainEventBus,
        DomainEventPublisher,
        // AggregateRepository,
        KafkaClientService,
      ],
      exports: [
        KafkaClientService,
        EventStore,
        ViewUpdater,
        ViewEventBus,
        DomainEventBus,
        DomainEventPublisher,
        // AggregateRepository,
      ],
    };
  }
}
