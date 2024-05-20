import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async execute(
    payload: ISendMailOptions,
    html?: string,
  ): Promise<SentMessageInfo> {
    const sendMail: ISendMailOptions = {
      to: payload.to,
      from: payload.from,
      subject: payload.subject,
      ...(payload?.text && { text: payload.text }),
      ...(html && { html }),
    };
    const mail = await this.mailerService.sendMail(sendMail);
    return mail;
  }
}
