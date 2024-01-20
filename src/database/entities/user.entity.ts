import { BaseEntity, Column, Entity } from 'typeorm';
import { DefaultEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends DefaultEntity {
  @Column()
  username?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  otp_code?: string;

  @Column({ nullable: true })
  otp_reference?: string;

  @Column({ nullable: true })
  otp_expiration?: Date;

  @Column({ nullable: true, default: false })
  is_verified?: boolean;

  @Column({ nullable: true })
  status?: string;
}
