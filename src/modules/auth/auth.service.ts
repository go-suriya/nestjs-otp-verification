import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-register.dto';
import { RegisterService } from 'src/usecases/auth/register/register.service';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { ResendOtpService } from 'src/usecases/auth/resend-otp/resend-otp.service';
import { VerifyDto } from './dto/verify.dto';
import { VerifyEmailService } from 'src/usecases/auth/verify-email/verify-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly resendOtpService: ResendOtpService,
    private readonly verifyEmailService: VerifyEmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    return await this.registerService.execute(registerDto);
  }

  async resendOtp(resendOtpDto: ResendOtpDto) {
    return await this.resendOtpService.execute(resendOtpDto);
  }

  async verify(verifyDto: VerifyDto) {
    return await this.verifyEmailService.execute(verifyDto);
  }
}
