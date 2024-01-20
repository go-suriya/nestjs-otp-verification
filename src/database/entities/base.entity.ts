import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_date?: Date;

  @Column({ nullable: true })
  created_by?: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_date?: Date;

  @Column({ nullable: true })
  updated_by?: string;
}
