import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { modules } from './module';

@Module({
  imports: [],
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
