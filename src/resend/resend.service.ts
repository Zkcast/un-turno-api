import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { UsersService } from 'src/users/users.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { CompanyService } from 'src/company/company.service';
import { JwtService } from '@nestjs/jwt';
import { renderTemplate } from './html/render-html';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { trueResponse } from 'src/helpers/customResponses';

@Injectable()
export class ResendService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async inviteCompanyMailService(inviteUserDto: InviteUserDto) {
    const resend_key = this.configService.get('RESEND_KEY');
    const front_url = this.configService.get('FRONT_URL');
    const resend = new Resend(resend_key);
    const { email, company_id } = inviteUserDto;
    const payload = { email: email, company_id: company_id };
    const token = this.jwtService.sign(payload);

    const company =
      await this.companyService.findOneCompanyByIdService(company_id);
    if (!company) throw new BadRequestException('Company not found');

    const user = await this.usersService.findOneUserByEmailService(email);
    const html = renderTemplate(
      join(__dirname, '../../src/resend/html/join-html.html'),
      {
        name: user ? user.name : '',
        company_name: company.company_name,
        token,
        url: front_url,
      },
    );

    try {
      if (user) {
        const response = await resend.emails.send({
          from: `${company.company_name} <onboarding@resend.dev>`,
          to: email,
          subject: `Join to ${company.company_name}`,
          html,
        });

        if (response.error)
          throw new BadRequestException(response.error.message);

        return trueResponse(response.data, 'Email sent successfully');
      } else {
        const response = await resend.emails.send({
          from: `${company.company_name} <onboarding@resend.dev>`,
          to: email,
          subject: `Register to ${company.company_name}`,
          html,
        });

        if (response.error)
          throw new BadRequestException(response.error.message);

        return trueResponse(response.data, 'Email sent successfully');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
