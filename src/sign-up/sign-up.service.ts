import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { createTransport } from 'nodemailer';

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
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(user: User): Promise<void> {
    try {
      // TODO: 何かしらの方法で生成
      const activateToken = 'activateToken';

      const message = {
        from: 'rikinotricky@gmail.com',
        to: 'rikinotricky@gmail.com',
        subject: 'activate account',
        text: `http://localhost:3000/sign_up?user_id=${user.id}&activate_token=${activateToken}`,
      };

      console.log('sending...');

      ('');
      smtp.sendMail(message, (error) => {
        if (error) {
          console.log('failed sending');
          console.log(error.message);
          return;
        }

        console.log('successfully sent');
        const userWithActivateToken = {
          ...user,
          activate_token: activateToken,
        };
        const createUser = this.usersRepository.create(userWithActivateToken);
        this.usersRepository.save(createUser, { reload: true });
      });
    } catch (e) {
      console.log('error: ', e);
    }
  }

  async findOne(params: { id: string }): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: params.id });
  }

  async activate(params: { id: string }): Promise<void> {
    await this.usersRepository.update(params, { is_active: true });
  }
}
