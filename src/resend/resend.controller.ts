import { Body, Controller, Post } from '@nestjs/common';
import { ResendService } from './resend.service';
import { InviteUserDto } from './dto/invite-user.dto';

@Controller('resend')
export class ResendController {
  constructor(private readonly resendService: ResendService) {}

  @Post('invite')
  inviteMail(@Body() inviteUserDto: InviteUserDto) {
    return this.resendService.inviteCompanyMailService(inviteUserDto);
  }
}
