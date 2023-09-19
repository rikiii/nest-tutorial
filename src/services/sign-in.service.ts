import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/lib-services/jwt.service';

export class SignInCommand {
  readonly userId: string;
  readonly password: string;
  readonly active?: boolean;

  constructor(command: SignInCommand) {
    this.userId = command.userId;
    this.password = command.password;
  }
}

class Result {
  readonly ok: boolean;
  readonly token: string;

  constructor(result: Result) {
    this.ok = result.ok;
    this.token = result.token;
  }
}

@Injectable()
export class SignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignInCommand): Promise<Result> {
    const user = await this.userRepository.findOneById(command.userId);
    if (!user) throw new HttpException('Not found user.', HttpStatus.NOT_FOUND);

    const isPasswordValid = await bcrypt.compare(
      command.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new HttpException('Invalid Password.', HttpStatus.BAD_REQUEST);

    const token = this.jwtService.generate(user.id);

    return new Result({ ok: true, token });
  }
}
