import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(params: Pick<User, 'id' | 'is_active'>): Promise<User> {
    return this.userRepository.findOneBy({
      id: params.id,
      is_active: params.is_active,
    });
  }

  generateJWT(id: string) {
    const payload = {
      sub: id,
      exp: new Date().setDate(new Date().getDate() + 7),
    };

    const token = jwt.sign(payload, 'test');
    jwt.verify(token, 'test');

    return jwt.sign(payload, 'test');
  }
}
