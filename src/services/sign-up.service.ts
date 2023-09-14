import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { generateRandomString } from 'src/utils/generate-random-string';
import { UserRepository } from 'src/repositories/user.repository';
import { NodemailerService } from 'src/lib-services/nodemailer.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async signUp(user: User): Promise<void> {
    const activateToken = generateRandomString(30);
    const activateUrl = `http://localhost:3000/sign_up?user_id=${user.id}&activate_token=${activateToken}`;
    const saltRounds = 10;
    const userWithActivateToken = {
      ...user,
      password: await bcrypt.hash(user.password, saltRounds),
      activate_token: activateToken,
    };
    await this.userRepository.add(userWithActivateToken);

    await this.nodemailerService.send({
      from: user.email_address,
      to: user.email_address,
      subject: 'activate account',
      text: activateUrl,
    });
  }

  async findOne(params: { id: string }): Promise<User | null> {
    return this.userRepository.findOne({ id: params.id });
  }

  async activate(params: Pick<User, 'id' | 'activate_token'>): Promise<void> {
    const user = await this.userRepository.findOne({ id: params.id });

    console.log('user: ', user);
    if (user.activate_token !== params.activate_token)
      throw new Error('failed to activate the user');
    await this.userRepository.activate(params);
  }
}
