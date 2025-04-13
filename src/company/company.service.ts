import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async findAllCompaniesService() {
    return await this.companyRepository.findAllCompaniesRepository();
  }

  async findOneCompanyByIdService(id: string) {
    return await this.companyRepository.findOneCompanyByIdRepository(id);
  }

  async findOneCompanyByEmailService(email: string) {
    return await this.companyRepository.findOneCompanyByEmail(email);
  }

  async findOneCompanyByPhoneService(phone: number) {
    return await this.companyRepository.findOneCompanyByPhone(phone);
  }
}
