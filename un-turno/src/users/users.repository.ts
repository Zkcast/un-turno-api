import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { trueResponse } from 'src/helpers/customResponses';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUpRepository(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    const secureUser = {
      ...user,
      password: undefined,
      confirmPassword: undefined,
    };
    return trueResponse(secureUser, 'User created successfully');
  }

  async findOneByEmailRepository(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByPhoneRepository(phone: number) {
    return await this.userRepository.findOne({ where: { phone } });
  }
}
