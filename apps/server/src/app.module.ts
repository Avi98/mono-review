import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config, { dbConfig } from './utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PublicApiModule } from './api/public/public-api.module';
import { PrivateApiModule } from './api/private/private-api.module';
import { SessionModule } from './session/session.module';
import { PermissionModule } from './permission/permission.module';
import { OrganizationModule } from './organization/organization.modal';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig()),
    AuthModule,
    UserModule,
    PublicApiModule,
    PrivateApiModule,
    SessionModule,
    PermissionModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
