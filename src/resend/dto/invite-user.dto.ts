import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class InviteUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  company_id: string;
}
