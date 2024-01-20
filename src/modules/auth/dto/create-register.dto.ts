import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'mcast31mcast31' })
  username: string;

  @ApiProperty({ example: 'mcast31mcast31@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Go123456789' })
  password: string;
}
