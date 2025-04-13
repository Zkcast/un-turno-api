import { Module } from '@nestjs/common';
import { ResendService } from './resend.service';
import { ResendController } from './resend.controller';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { CompanyRepository } from 'src/company/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  controllers: [ResendController],
  providers: [
    ResendService,
    UsersService,
    UsersRepository,
    CompanyService,
    CompanyRepository,
  ],
})
export class ResendModule {}
