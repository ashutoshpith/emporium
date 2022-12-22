import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);
  await app.listen(process.env.IDENTITY_PORT);
}
bootstrap();
