import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email_address: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column()
  activate_token: string;
}
