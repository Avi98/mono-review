import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSession } from './utils/config';
import { SessionService } from './session/session.service';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './exceptions/exceptionhandler';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const appConfig = app.get(ConfigService);

  const sessionStore = app.get(SessionService).getTypeormStore();
  setupSession(sessionStore, app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(appConfig.get('BE_PORT'));
}
bootstrap();
