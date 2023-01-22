import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EventSourcingModule,
  EventStore,
  SnapshotStore,
} from '@ocoda/event-sourcing';
import {
  AggregateRepositories,
  CommandHandlers,
  EventHandlers,
  EventPublishers,
  Events,
  SnapshotHandlers,
} from './app.providers';
import { PlayResolver } from './application/resolvers/play.resolver';
import { Play, PlaySchema } from './application/schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/play'),
    MongooseModule.forFeature([
      {
        name: Play.name,
        schema: PlaySchema,
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      // include: [...modules],
      resolvers: [],
      introspection: true,
      autoSchemaFile: true,
    }),
    EventSourcingModule.forRootAsync({
      useFactory: () => ({
        events: [...Events],
        eventStore: {
          client: 'mongodb',
          options: {
            url: 'mongodb://localhost:27017/es2',
            useUnifiedTopology: true,
          },
        },
        snapshotStore: {
          client: 'mongodb',
          options: {
            url: 'mongodb://localhost:27017/ss2',
            useUnifiedTopology: true,
          },
        },
      }),
    }),
  ],
  providers: [
    ...AggregateRepositories,
    ...CommandHandlers,
    ...SnapshotHandlers,
    ...EventHandlers,
    ...EventPublishers,
    PlayResolver,
  ],
})
export class PlayModule implements OnModuleInit {
  constructor(
    private readonly eventStore: EventStore,
    private readonly snapshotStore: SnapshotStore,
  ) {}

  onModuleInit() {
    this.eventStore.setup();
    this.snapshotStore.setup();
  }
}
