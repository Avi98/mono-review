import { IsNumber, IsString } from 'class-validator';

export class OrganizationInfoDto {
  @IsString()
  orgName: string;

  @IsNumber()
  userId: number;

  @IsString()
  orgSlug: string;

  @IsNumber()
  maxOrgSize: number;
}
