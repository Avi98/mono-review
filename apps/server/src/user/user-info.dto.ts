import {
  IsEmail,
  IsString,
  IsLowercase,
  IsAlphanumeric,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsLowercase()
  email: string;

  @IsString()
  photo: string;

  @IsAlphanumeric()
  password: string;
}
