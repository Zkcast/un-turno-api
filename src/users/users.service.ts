import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companyService: CompanyService,
  ) {}

  async findAllUsersService() {
    return await this.usersRepository.findAllUsersRepository();
  }

  async findOneUserByIdService(id: string) {
    return await this.usersRepository.findOneUserByIdRepository(id);
  }

  async findOneUserByEmailService(email: string) {
    return await this.usersRepository.findOneUserByEmailRepository(email);
  }

  async findOneUserByPhoneService(phone: string) {
    return await this.usersRepository.findOneUserByPhoneRepository(phone);
  }

  async joinUserCompanyService(user_id: string, company_id: string) {
    const user = await this.usersRepository.findOneUserByIdRepository(user_id);
    const company =
      await this.companyService.findOneCompanyByIdService(company_id);

    if (!user) throw new BadRequestException('User not found');
    if (!company) throw new BadRequestException('Company not found');
    console.log(user, company);
    if (user.companies.find((c) => c.id === company.id))
      throw new BadRequestException('User already joined to this company');

    return await this.usersRepository.joinUserCompanyRepository(user, company);
  }
}
