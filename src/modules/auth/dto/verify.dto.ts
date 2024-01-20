import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({ example: 'mcast31mcast31@gmail.com' })
  email: string;

  @ApiProperty({ example: '666666' })
  otp_code: string;

  @ApiProperty({ example: 'GGGOOO' })
  otp_reference: string;
}
