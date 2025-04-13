import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InviteUserDto } from './dto/invite-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAllUsersService();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneUserByIdService(id);
  }

  @Post('join-company')
  joinCompany(@Body() inviteUserDto: InviteUserDto) {
    return this.usersService.joinUserCompanyService(
      inviteUserDto.user_id,
      inviteUserDto.company_id,
    );
  }
}
