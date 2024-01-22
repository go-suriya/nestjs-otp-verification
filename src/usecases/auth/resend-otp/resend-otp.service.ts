import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { ResendOtpDto } from 'src/modules/auth/dto/resend-otp.dto';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';
import { SendMailService } from 'src/usecases/mail/send-mail/send-mail.service';
import { generateOTP, generateReferenceOTP } from 'src/utils/generate-otp';
import { SentMessageInfo } from 'nodemailer';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ResendOtpService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly sendMailService: SendMailService,
  ) {}

  async execute(resendOtpDto: ResendOtpDto) {
    const { email } = resendOtpDto;

    const otpCode = generateOTP();
    const otpRef = generateReferenceOTP();
    const minutes = 5;
    const futureDate = calculateFutureDate(minutes);

    const user: UserEntity = {
      email,
      otp_code: otpCode,
      otp_reference: otpRef,
      otp_expiration: futureDate,
    };

    const emailExists = await this.emailExists(user);
    console.log('emailExists =>', emailExists);

    if (!emailExists) {
      throw new Error('User not found');
    }

    const result = await this.updateResendOtp(emailExists.id, user);
    console.log('result', result);

    if (result && result?.affected > 0) {
      await this.sendMail(user);

      return result;
    }

    throw new Error('Resend OTP Bad Request');
  }

  private async updateResendOtp(
    id: string,
    { email, ...user }: UserEntity,
  ): Promise<UpdateResult> {
    const data = await this.userRepositoryService.update(id, user);
    console.log('data', data);

    return data;
  }

  private async emailExists({ email }: UserEntity): Promise<UserEntity> {
    const data = await this.userRepositoryService.findOne({
      where: {
        email,
      },
    });

    return data;
  }

  private async sendMail(user: UserEntity): Promise<SentMessageInfo> {
    const { otp_code, otp_reference, email } = user;
    const subject = 'Email Verification';
    const message = `Your OTP code is: ${otp_code} OTP ref is: ${otp_reference}`;

    const sendMailOptions: ISendMailOptions = {
      from: process.env.MAILER_USER,
      to: email,
      subject,
      text: message,
    };

    const sendMail = await this.sendMailService.execute(sendMailOptions);

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
