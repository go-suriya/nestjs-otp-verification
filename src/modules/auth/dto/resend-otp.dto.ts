import { ApiProperty } from '@nestjs/swagger';

export class ResendOtpDto {
  @ApiProperty({ example: 'mcast31mcast31@gmail.com' })
  email: string;
}
