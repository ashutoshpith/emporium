import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [],
  providers: [ProductResolver],
})
export class ProductModule {}
