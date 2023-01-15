import { NestFactory } from '@nestjs/core';
import { IamModule } from './iam.module';

async function bootstrap() {
  const app = await NestFactory.create(IamModule);
  console.log('Identity');

  await app.listen(3000);
}
bootstrap();
