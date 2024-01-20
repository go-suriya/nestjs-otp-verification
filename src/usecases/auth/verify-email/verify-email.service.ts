import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { VerifyDto } from 'src/modules/auth/dto/verify.dto';
import { UserRepositoryService } from 'src/repositories/user-repository/user-repository.service';

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService, // private readonly sendMailService: SendMailService,
  ) {}

  async execute(verifyDto: VerifyDto) {
    const { email } = verifyDto;
    const emailExists = await this.emailExists(email);

    if (!emailExists) {
      throw new Error('User not found');
    }

    const user = await this.verifyEmail(verifyDto);

    if (!user) throw new Error('OTP is invalid');

    const result = user;

    console.log('result =>', result);

    return result;
  }

  private async emailExists(email: string): Promise<UserEntity> {
    const data = await this.userRepositoryService.findOne({
      where: {
        email,
      },
    });

    return data;
  }

  async verifyEmail({ email, otp_code, otp_reference }: VerifyDto) {
    const user = await this.userRepositoryService.findOne({
      where: {
        email,
        otp_code,
        otp_reference,
      },
    });

    if (!user) return null;

    const otpExpired = new Date() > new Date(user.otp_expiration);
    if (otpExpired) throw new Error('OTP is expired');

    const alreadyVerified = user.is_verified === true;
    if (alreadyVerified) throw new Error('Email has been verified');

    user.is_verified = true;
    await this.userRepositoryService.update(user.id, user);

    return user;
  }
}
