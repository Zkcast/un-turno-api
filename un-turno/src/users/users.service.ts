import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { trueResponse } from 'src/helpers/customResponses';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signUpService(createUserDto: CreateUserDto) {
    const userRepeatedEmail = await this.findOneByEmailService(
      createUserDto.email,
    );
    if (createUserDto.phone) {
      const userRepeatedPhone = await this.findOneByPhoneService(
        createUserDto.phone,
      );
      if (userRepeatedPhone)
        throw new BadRequestException('Phone already exists');
    }
    if (userRepeatedEmail)
      throw new BadRequestException('Email already exists');
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    if (!hashedPassword) throw new BadRequestException('Password error');
    createUserDto.password = hashedPassword;
    return this.usersRepository.signUpRepository(createUserDto);
  }

  async signInService(loginUserDto: LoginUserDto) {
    const user = await this.findOneByEmailService(loginUserDto.email);
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  findOneByEmailService(email: string) {
    return this.usersRepository.findOneByEmailRepository(email);
  }

  findOneByPhoneService(phone: number) {
    return this.usersRepository.findOneByPhoneRepository(phone);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
