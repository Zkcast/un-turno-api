import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { trueResponse } from 'src/helpers/customResponses';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUpUserRepository(createUser, company: Company) {
    createUser.companies = [company];
    await this.userRepository.save(createUser);
    const user = await this.userRepository.findOne({
      where: { email: createUser.email },
    });
    return trueResponse(user, 'User created successfully');
  }

  async findAllUsersRepository() {
    return await this.userRepository.find({ relations: ['companies'] });
  }

  async findOneUserByIdRepository(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['companies'],
    });
  }

  async findOneUserByEmailRepository(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneUserByPhoneRepository(phone: string) {
    return await this.userRepository.findOne({ where: { phone } });
  }

  async joinUserCompanyRepository(user: User, company: Company) {
    user.companies.push(company);
    const userUpdated = await this.userRepository.save(user);
    return trueResponse(userUpdated, 'User joined to company successfully');
  }

  async seedUsersRepository(users: User[]) {
    await this.userRepository.save(users);
    console.log('Users seeded successfully');
    return users;
  }

  async saveUserCompaniesRepository(user: User) {
    await this.userRepository.save(user);
  }
}
