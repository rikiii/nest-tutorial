import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserRepository) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params: { id: string }): Promise<User> {
    return await this.usersService.findOne(params);
  }

  @Post()
  async post(@Body() user: User): Promise<void> {
    await this.usersService.add(user);
  }
}
