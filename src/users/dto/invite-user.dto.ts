import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InviteUserDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  company_id: string;
}
