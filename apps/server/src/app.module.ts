import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { dbConfig } from './utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PublicApiModule } from './api/public/public-api.module';
import { PrivateApiModule } from './api/private/private-api.module';
import { SessionModule } from './session/session.module';
import { OrganizationModule } from './organization/organization.modal';
import { env } from '@pr/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => env],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig()),
    AuthModule,
    UserModule,
    PublicApiModule,
    PrivateApiModule,
    SessionModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
