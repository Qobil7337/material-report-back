import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from "fs";

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/167.71.83.248/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/167.71.83.248/fullchain.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
