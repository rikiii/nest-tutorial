import { Body, Query, Controller, Get, Post } from '@nestjs/common';
import { SignUpCommand, SignUpService } from '../services/sign-up.service';
import { SignInCommand, SignInService } from '../services/sign-in.service';
import { ActivateCommand, ActivateService } from '../services/activate.service';
import { SignUpRequestBody, SignUpResponseBody } from './dto/sign-up.dto';
import { ActivateRequestQuery, ActivateResponseBody } from './dto/activate.dto';
import { SignInRequestBody, SignInResponseBody } from './dto/sign-in.dto';

@Controller()
export class AppController {
  constructor(
    private readonly signUpService: SignUpService,
    private readonly signInService: SignInService,
    private readonly activateService: ActivateService,
  ) {}

  @Post('/sign_up')
  async signUp(@Body() body: SignUpRequestBody): Promise<SignUpResponseBody> {
    const command = new SignUpCommand({
      userId: body.id,
      emailAddress: body.email_address,
      password: body.password,
      active: body.active,
      activateToken: body.activate_token,
    });
    const result = await this.signUpService.signUp(command);
    return { ok: result.ok };
  }

  @Get('/activate')
  async activateUser(
    @Query()
    query: ActivateRequestQuery,
  ): Promise<ActivateResponseBody> {
    const command = new ActivateCommand({
      userId: query.user_id,
      activateToken: query.activate_token,
    });
    const result = await this.activateService.execute(command);
    return { ok: result.ok };
  }

  @Post('/sign_in')
  async signIn(@Body() body: SignInRequestBody): Promise<SignInResponseBody> {
    const command = new SignInCommand({
      userId: body.id,
      password: body.password,
    });
    const result = await this.signInService.execute(command);
    return { ok: result.ok, token: result.token };
  }
}
