import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor() {}

  generate(id: string): string {
    const payload = {
      sub: id,
      exp: new Date().setDate(new Date().getDate() + 7),
    };

    return jwt.sign(payload, 'test');
  }
}
