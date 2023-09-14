import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Controller('sign_in')
export class SignInController {
  constructor(private readonly usersService: UserRepository) {}

  @Post()
  async signIn(@Body() authInfo: Pick<User, 'id' | 'password' | 'is_active'>) {
    const user = await this.usersService.findOne({ id: authInfo.id });
    if (authInfo.is_active && authInfo.password === user.password) {
      console.log('authenticated');
    }
  }
}
