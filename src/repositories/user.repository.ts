import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findActiveOne(
    params: Pick<User, 'id' | 'email_address'>,
  ): Promise<User | null> {
    if (params.id) {
      return this.userRepository.findOneBy({
        id: params.id,
        is_active: true,
      });
    } else if (params.email_address) {
      return this.userRepository.findOneBy({
        email_address: params.email_address,
        is_active: true,
      });
    } else {
      return null;
    }
  }

  async findOne(
    params: Partial<Pick<User, 'id' | 'email_address'>>,
  ): Promise<User | null> {
    if (params.id) {
      return this.userRepository.findOneBy({
        id: params.id,
      });
    } else if (params.email_address) {
      return this.userRepository.findOneBy({
        email_address: params.email_address,
      });
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async add(user: User): Promise<void> {
    const createdUser = this.userRepository.create(user);
    this.userRepository.save(createdUser, { reload: true });
  }

  async activate(params: Pick<User, 'id'>): Promise<void> {
    await this.userRepository.update(params, { is_active: true });
  }
}
