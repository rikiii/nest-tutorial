import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SignUpService } from './services/sign-up.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NodemailerService } from './lib-services/nodemailer.service';
import { JwtService } from './lib-services/jwt.service';
import { SignInService } from './services/sign-in.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_tutorial',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [
    UserRepository,
    NodemailerService,
    SignUpService,
    JwtService,
    SignInService,
  ],
  controllers: [AppController],
})
export class AppModule {}
