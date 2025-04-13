import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { trueResponse } from 'src/helpers/customResponses';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { CompanyRepository } from 'src/company/company.repository';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/users/entities/user.entity';
import * as usersMock from 'src/helpers/users.json';
import * as companiesMock from 'src/helpers/companies.json';
import { Company } from 'src/company/entities/company.entity';
import { getRandomItems } from 'src/helpers/ramdomItems';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly companyService: CompanyService,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async onModuleInit() {
    const companies = await this.companyRepository.findAllCompaniesRepository();
    const users = await this.usersRepository.findAllUsersRepository();
    if (users.length === 0 && companies.length === 0) {
      await this.seedUsersService();
      await this.seedCompaniesService();

      const savedUsers = await this.usersRepository.findAllUsersRepository();
      const savedCompanies =
        await this.companyRepository.findAllCompaniesRepository();

      for (const user of savedUsers) {
        const randomCompanies = getRandomItems(savedCompanies, 2);
        user.companies = randomCompanies;
        await this.usersRepository.saveUserCompaniesRepository(user);
      }
    }
  }

  async seedUsersService() {
    const users: User[] = await Promise.all(
      usersMock.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );
    return this.usersRepository.seedUsersRepository(users);
  }

  async seedCompaniesService() {
    const companies: Company[] = await Promise.all(
      companiesMock.map(async (company) => ({
        ...company,
        password: await bcrypt.hash(company.password, 10),
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );
    return this.companyRepository.seedCompaniesRepository(companies);
  }
  async signUpUsersService(createUserDto: CreateUserDto) {
    const userRepeatedEmail = await this.usersService.findOneUserByEmailService(
      createUserDto.email,
    );
    if (userRepeatedEmail)
      throw new BadRequestException('Email already exists');

    if (createUserDto.phone) {
      const userRepeatedPhone =
        await this.usersService.findOneUserByPhoneService(createUserDto.phone);
      if (userRepeatedPhone)
        throw new BadRequestException('Phone already exists');
    }

    const company = await this.companyService.findOneCompanyByIdService(
      createUserDto.company_id,
    );
    if (!company) throw new BadRequestException('Company not found');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    if (!hashedPassword) throw new BadRequestException('Password error');
    createUserDto.password = hashedPassword;

    return this.usersRepository.signUpUserRepository(createUserDto, company);
  }

  async signUpCompanyService(createCompanyDto: CreateCompanyDto) {
    const companyRepeatedEmail =
      await this.companyService.findOneCompanyByEmailService(
        createCompanyDto.email,
      );
    if (companyRepeatedEmail)
      throw new BadRequestException('Email already exists');

    const companyRepeatedPhone =
      await this.companyService.findOneCompanyByPhoneService(
        createCompanyDto.phone,
      );
    if (companyRepeatedPhone)
      throw new BadRequestException('Phone already exists');

    const hashedPassword = await bcrypt.hash(createCompanyDto.password, 10);
    if (!hashedPassword) throw new BadRequestException('Password error');
    createCompanyDto.password = hashedPassword;

    return this.companyRepository.signUpCompanyRepository(createCompanyDto);
  }

  async signInUserService(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneUserByEmailService(
      loginUserDto.email,
    );
    if (!user) throw new BadRequestException('User not found');

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordMatch) throw new BadRequestException('User not found');

    const userPayload = { id: user.id };
    const token = this.jwtService.sign(userPayload);

    return trueResponse(token, 'User logged in successfully');
  }

  async signInCompanyService(loginUserDto: LoginUserDto) {
    const company = await this.companyService.findOneCompanyByEmailService(
      loginUserDto.email,
    );
    if (!company) throw new BadRequestException('Company not found');

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      company.password,
    );
    if (!passwordMatch) throw new BadRequestException('Company not found');

    const companyPayload = { id: company.id };
    const token = this.jwtService.sign(companyPayload);

    return trueResponse(token, 'Company logged in successfully');
  }
}
