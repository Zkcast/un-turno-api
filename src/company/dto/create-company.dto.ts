import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Match } from 'src/custom-validators/match.decorator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  responsible_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'the password must be strong, it must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;

  @Match('password')
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  company_name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;
}

// export class LoginC
