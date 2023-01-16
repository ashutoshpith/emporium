import { DomainEventSourcingModule } from '@core/core/message-broker';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityCreateHandler } from './handler/identity-create.handler';
import { IdentityUpdateHandler } from './handler/identity-update.handler';
import { IdentityRepo } from './identity.repo';
import { IdentityResolver } from './identity.resolver';
import { Identity, IdentitySchema } from './identity.schema';
import { IdentityService } from './identity.service';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DomainEventSourcingModule.forFeature(),

    MongooseModule.forFeature([
      {
        name: Identity.name,
        schema: IdentitySchema,
      },
    ]),
  ],
  providers: [
    IdentityResolver,
    IdentityRepo,
    IdentityService,
    IdentityCreateHandler,
    IdentityUpdateHandler,
  ],
  exports: [],
})
export class IdentityModule {}
