import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CompanyRepository } from 'src/company/company.repository';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    CompanyService,
    CompanyRepository,
  ],
})
export class AuthModule {}
