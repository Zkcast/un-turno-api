import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/users')
  signUpUsers(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUsersService(createUserDto);
  }

  @Post('signin/users')
  signInUsers(@Body() createUserDto: LoginUserDto) {
    return this.authService.signInUserService(createUserDto);
  }

  @Post('signup/companies')
  signUpCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.signUpCompanyService(createCompanyDto);
  }

  @Post('signin/companies')
  signInCompany(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signInCompanyService(loginUserDto);
  }
}
