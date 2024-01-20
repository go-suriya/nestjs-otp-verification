import { Injectable } from '@nestjs/common';
import { SendMail } from './types';
import { SentMessageInfo } from 'nodemailer';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

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
