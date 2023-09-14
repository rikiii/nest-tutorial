import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/lib-services/jwt.service';

@Injectable()
export class SignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(params: Pick<User, 'id' | 'password'>): Promise<string> {
    const user = await this.userRepository.findActiveOne({ id: params.id });
    if (!user) return;

    const isPasswordValid = await bcrypt.compare(
      params.password,
      user.password,
    );

    if (isPasswordValid) {
      return this.jwtService.generate(user.id);
    }
  }
}
