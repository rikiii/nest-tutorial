import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
