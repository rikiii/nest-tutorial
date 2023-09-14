import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SignUpService } from './services/sign-up.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

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
  ],
  providers: [UserRepository, SignUpService],
  controllers: [AppController],
})
export class AppModule {}
