import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
} from 'class-validator';
import { Match } from 'src/custom-validators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  lastname: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  phone: number;

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

  @Match('password', { message: 'Password and Confirm Password do not match' })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  company_id: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
