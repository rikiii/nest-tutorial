import { Body, Query, Controller, Get, Post } from '@nestjs/common';
import { User } from './users/user.entity';
import { SignUpService } from './services/sign-up.service';

@Controller()
export class AppController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('/sign_up')
  async signUp(@Body() user: User): Promise<void> {
    await this.signUpService.signUp(user);
  }

  @Get('/sign_up')
  async activateUser(
    @Query()
    query: {
      user_id: string;
      activate_token: string;
    },
  ) {
    await this.signUpService.activate({
      id: query.user_id,
      activate_token: query.activate_token,
    });
  }
}
