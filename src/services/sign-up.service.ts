import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { createTransport } from 'nodemailer';
import { generateRandomString } from 'src/utils/generate-random-string';
import { UserRepository } from 'src/repositories/user.repository';

// nodemailerでメールを送るための設定
const smtp = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rikinotricky@gmail.com',
    pass: 'wnemqffvekqqvokz',
  },
});

@Injectable()
export class SignUpService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: User): Promise<void> {
    try {
      const activateToken = generateRandomString(30);

      const message = {
        from: user.email_address,
        to: user.email_address,
        subject: 'activate account',
        text: `http://localhost:3000/sign_up?user_id=${user.id}&activate_token=${activateToken}`,
      };

      console.log('sending...');

      smtp.sendMail(message, (error) => {
        if (error) {
          console.log('failed sending');
          return;
        }

        console.log('successfully sent');
        const userWithActivateToken = {
          ...user,
          activate_token: activateToken,
        };
        this.userRepository.add(userWithActivateToken);
      });
    } catch (e) {
      console.log('error: ', e);
    }
  }

  async findOne(params: { id: string }): Promise<User | null> {
    return this.userRepository.findOne({ id: params.id });
  }

  async activate(params: Pick<User, 'id' | 'activate_token'>): Promise<void> {
    console.log('params.id: ', params.id);
    const user = await this.userRepository.findOne({ id: params.id });

    if (user.activate_token !== params.activate_token)
      throw new Error('failed to activate the user');
    await this.userRepository.activate(params);
  }
}
