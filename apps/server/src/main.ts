import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSession } from './utils/config';
import { SessionService } from './session/session.service';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './exceptions/exceptionhandler';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfig = app.get(ConfigService);

  const isDev = appConfig.get('isDev');
  const frontendOrigin = appConfig.get('endpoint_FE');
  const port = appConfig.get('BE_PORT');

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  const sessionStore = app.get(SessionService).getTypeormStore();
  setupSession(sessionStore, app, isDev);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  await app.listen(port);

  console.log('\nbackend server is running on port:' + parseInt(port));
  console.log('\n');
}
bootstrap();
