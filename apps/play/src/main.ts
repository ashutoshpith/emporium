import { NestFactory } from '@nestjs/core';
import { PlayModule } from './play.module';

async function bootstrap() {
  const app = await NestFactory.create(PlayModule);
  await app.listen(3000);
}
bootstrap();
