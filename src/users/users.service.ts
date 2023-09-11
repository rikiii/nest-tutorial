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
    return await this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(body: { firstName: string; lastName: string }): Promise<void> {
    const user = this.usersRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      isActive: true,
    });

    this.usersRepository.save(user, { reload: true });
  }
}
