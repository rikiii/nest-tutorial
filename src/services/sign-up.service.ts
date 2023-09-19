import { Injectable } from '@nestjs/common';
import { generateRandomString } from 'src/utils/generate-random-string';
import { UserRepository } from 'src/repositories/user.repository';
import { NodemailerService } from 'src/lib-services/nodemailer.service';
import * as bcrypt from 'bcrypt';

export class SignUpCommand {
  readonly userId: string;
  readonly emailAddress: string;
  readonly password: string;
  readonly active: boolean;
  readonly activateToken: string;

  constructor(command: SignUpCommand) {
    this.userId = command.userId;
    this.emailAddress = command.emailAddress;
    this.password = command.password;
    this.active = command.active;
    this.activateToken = command.activateToken;
  }
}

class Result {
  readonly ok: boolean;
  constructor(result: Result) {
    this.ok = result.ok;
  }
}

@Injectable()
export class SignUpService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async signUp(command: SignUpCommand): Promise<Result> {
    const activateToken = generateRandomString(30);
    const activateUrl = `http://localhost:3000/activate?user_id=${command.userId}&activate_token=${activateToken}`;
    const saltRounds = 10;
    const userWithActivateToken = {
      id: command.userId,
      emailAddress: command.emailAddress,
      password: await bcrypt.hash(command.password, saltRounds),
      activateToken,
      active: command.active,
    };
    await this.userRepository.put(userWithActivateToken);

    await this.nodemailerService.send({
      from: command.emailAddress,
      to: command.emailAddress,
      subject: 'activate account',
      text: activateUrl,
    });

    return new Result({ ok: true });
  }
}
