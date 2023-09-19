import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserModel {
  @PrimaryColumn()
  id: string;

  @Column()
  email_address: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  activate_token: string;
}
