import { IsEmail, IsLowercase, IsAlphanumeric } from 'class-validator';

export class LoginInfoDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsAlphanumeric()
  password: string;
}
