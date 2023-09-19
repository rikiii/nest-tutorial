import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

export class ActivateCommand {
  readonly userId: string;
  readonly activateToken: string;

  constructor(command: ActivateCommand) {
    this.userId = command.userId;
    this.activateToken = command.activateToken;
  }
}

export class SignUpResult {
  readonly ok: boolean;
  constructor(result: SignUpResult) {
    this.ok = result.ok;
  }
}

@Injectable()
export class ActivateService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: ActivateCommand): Promise<SignUpResult> {
    const user = await this.userRepository.findOneById(command.userId, false);

    if (user.activateToken !== command.activateToken)
      throw new HttpException('Failed to activate.', HttpStatus.BAD_REQUEST);

    const activatedUser = { ...user, active: true };
    this.userRepository.update(activatedUser);

    return new SignUpResult({ ok: true });
  }
}
