import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { RegisterService } from './auth/register/register.service';
import { SendMailService } from './mail/send-mail/send-mail.service';
import { ResendOtpService } from './auth/resend-otp/resend-otp.service';
import { VerifyEmailService } from './auth/verify-email/verify-email.service';

@Module({
  imports: [RepositoriesModule],
  exports: [
    RegisterService,
    SendMailService,
    ResendOtpService,
    VerifyEmailService,
  ],
  providers: [
    RegisterService,
    SendMailService,
    ResendOtpService,
    VerifyEmailService,
  ],
})
export class UsecasesModule {}
