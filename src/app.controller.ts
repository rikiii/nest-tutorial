import { Body, Query, Controller, Get, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignUpService } from './services/sign-up.service';
import { SignInService } from './services/sign-in.service';

@Controller()
export class AppController {
  constructor(
    private readonly signUpService: SignUpService,
    private readonly signInService: SignInService,
  ) {}

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

  @Post('/sign_in')
  async signIn(@Body() body: Pick<User, 'id' | 'password'>): Promise<string> {
    return this.signInService.signIn({ id: body.id, password: body.password });
  }
}
