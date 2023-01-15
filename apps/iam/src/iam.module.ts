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
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'iam',
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
