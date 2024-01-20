import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-register.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('resend-otp')
  resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto);
  }

  @Post('verify')
  verify(@Body() verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto);
  }
}
