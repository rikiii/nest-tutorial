import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    console.log('test: ', await this.usersService.findAll());
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params: { id: string }): Promise<User> {
    console.log('user: ', params);
    return await this.usersService.findOne(params);
  }

  @Post()
  async post(@Body() user: User): Promise<void> {
    await this.usersService.addUser(user);
  }
}
