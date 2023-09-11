import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get(): Promise<User[]> {
    console.log('test: ', await this.usersService.findAll());
    return this.usersService.findAll();
  }

  @Post()
  async post(): Promise<void> {
    this.usersService.addUser({ firstName: 'first', lastName: 'last' });
  }
}
