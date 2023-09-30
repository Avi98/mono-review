import { IsNumber, IsString } from 'class-validator';

export class OrganizationInfoDto {
  @IsString()
  orgName: string;

  @IsString()
  userId: string;

  @IsString()
  orgSlug: string;

  @IsNumber()
  maxOrgSize: number;
}
