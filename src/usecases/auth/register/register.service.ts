import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { RegisterDto } from 'src/modules/auth/dto/create-register.dto';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';
import { SendMailService } from 'src/usecases/mail/send-mail/send-mail.service';
import { SendMail } from 'src/usecases/mail/send-mail/types';
import { generateOTP, generateReferenceOTP } from 'src/utils/generate-otp';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly sendMailService: SendMailService,
  ) {}

  async execute(registerDto: RegisterDto) {
    const result = await this.createUser(registerDto);

    if (result) {
      await this.sendMail(result);

      return result;
    }

    return result;
  }

  private async createUser(registerDto: RegisterDto): Promise<UserEntity> {
    const { username, email, password } = registerDto;

    const otpCode = generateOTP();
    const otpRef = generateReferenceOTP();
    const futureDate = new Date(Date.now() + 5 * 60 * 1000);

    const user: UserEntity = {
      username,
      email,
      password,
      otp_code: otpCode,
      otp_reference: otpRef,
      otp_expiration: futureDate,
    };

    return await this.userRepositoryService.create(user);
  }

  private async sendMail(user: UserEntity): Promise<SentMessageInfo> {
    const { otp_code,otp_reference, email } = user;
    const subject = 'Email Verification';
    const message = `Your OTP code is: ${otp_code} OTP ref is: ${otp_reference}`;

    const sendMailOptions: ISendMailOptions = {
      from: process.env.MAILER_USER,
      to: email,
      subject,
      text: message,
    };

    const sendMail = await this.sendMailService.execute(sendMailOptions);
    console.log('sendMail', JSON.stringify(sendMail));

    const successCode = 250;
    const responseCode = parseInt(sendMail?.response?.substr(0, 3), 10);

    if (responseCode === successCode) {
      return sendMail;
    } else {
      console.error('Error sending email:', sendMail.response);
      return;
    }
  }
}
