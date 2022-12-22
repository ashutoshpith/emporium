import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthResolver],
})
export class AuthModule {}
