import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: false })
  is_active: boolean;

  @Column()
  activate_token: string;
}
