import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { modules } from './module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...modules,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      debug: true,
      include: [...modules],
      introspection: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
