import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { User } from 'src/users/user.entity';

@Controller('sign_up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  async signUp(@Body() user: User): Promise<void> {
    await this.signUpService.signUp(user);
  }

  @Get()
  async activateUser(
    @Query() query: { user_id: string; activate_token: string },
  ) {
    const user = await this.signUpService.findOne({ id: query.user_id });
    console.log('query: ', query);
    console.log('user: ', user);
    if (user.activate_token === query.activate_token) {
      await this.signUpService.activate({ id: query.user_id });
    }
  }
}
