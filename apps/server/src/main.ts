import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSession } from './utils/config';
import { SessionService } from './session/session.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);

  const sessionStore = app.get(SessionService).getTypeormStore();
  setupSession(sessionStore);

  await app.listen(appConfig.get('BE_PORT'));
}
bootstrap();
