import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findOne(params: { id: string }): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: params.id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(user: User): Promise<void> {
    const createdUser = this.usersRepository.create(user);

    this.usersRepository.save(createdUser, { reload: true });
  }
}
