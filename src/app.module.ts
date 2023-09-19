import { Module } from '@nestjs/common';
import { AppController } from './controllers/root.controller';
import { SignUpService } from './services/sign-up.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { NodemailerService } from './lib-services/nodemailer.service';
import { JwtService } from './lib-services/jwt.service';
import { SignInService } from './services/sign-in.service';
import { ActivateService } from './services/activate.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_tutorial',
      entities: [UserModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  providers: [
    UserRepository,
    NodemailerService,
    SignUpService,
    JwtService,
    SignInService,
    ActivateService,
  ],
  controllers: [AppController],
})
export class AppModule {}
