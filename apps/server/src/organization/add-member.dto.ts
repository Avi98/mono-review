import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';
import { TitleEnum } from '../utils/enums/TitleEnum';

export class AddMemberDto {
  @IsEmail()
  email: string;

  @IsString()
  orgId: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserOrgRoleEnum)
  role: UserOrgRoleEnum;

  @IsEnum(TitleEnum)
  title: TitleEnum;
}
