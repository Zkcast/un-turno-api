import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { trueResponse } from 'src/helpers/customResponses';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async signUpCompanyRepository(createCompanyDto: CreateCompanyDto) {
    await this.companyRepository.save(createCompanyDto);
    const company = await this.companyRepository.findOne({
      where: { email: createCompanyDto.email },
    });
    return trueResponse(company, 'Company created successfully');
  }

  async findAllCompaniesRepository() {
    return await this.companyRepository.find({ relations: ['users'] });
  }

  async findOneCompanyByIdRepository(id: string) {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async findOneCompanyByEmail(email: string) {
    const company = await this.companyRepository.findOne({ where: { email } });
    return company;
  }

  async findOneCompanyByPhone(phone: number) {
    const company = await this.companyRepository.findOne({ where: { phone } });
    return company;
  }

  async seedCompaniesRepository(companies: Company[]) {
    await this.companyRepository.save(companies);
    console.log('companies seeded');
  }
}
