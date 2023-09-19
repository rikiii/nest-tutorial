import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from 'src/models/user.model';

export class User {
  readonly id: string;
  readonly emailAddress: string;
  readonly password: string;
  readonly active: boolean;
  readonly activateToken: string;

  constructor(user: User) {
    this.id = user.id;
    this.emailAddress = user.emailAddress;
    this.password = user.password;
    this.active = user.active;
    this.activateToken = user.activateToken;
  }
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  /**
   * 特定のIDのアクティブなユーザーを取得
   * @param id
   * @param active
   */
  async findOneById(id: string, active?: boolean): Promise<User> {
    const user = await this.userRepository
      .findOneBy({
        id,
        active: typeof active === 'undefined' ? true : active,
      })
      .catch((error) => {
        console.log(error.message);
        throw new Error();
      });
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    return this._generateEntity(user);
  }

  /**
   * 渡された情報でユーザーを作成
   * @param user
   */
  async put(user: User): Promise<User> {
    const model = this._generateModel(user);
    const createdUser = this.userRepository.create(model);
    const savedUser = await this.userRepository
      .save(createdUser, {
        reload: true,
      })
      .catch((error) => {
        console.log(error);
        throw new Error();
      });
    return this._generateEntity(savedUser);
  }

  /**
   * 渡された情報でユーザーを更新
   * @param user
   */
  async update(user: User): Promise<User> {
    const model = this._generateModel(user);
    const updatedUser = await this.userRepository.save(model).catch((error) => {
      console.log(error.message);
      throw new Error();
    });
    return this._generateEntity(updatedUser);
  }

  private _generateModel(user: User): UserModel {
    return {
      id: user.id,
      email_address: user.emailAddress,
      password: user.password,
      active: user.active,
      activate_token: user.activateToken,
    };
  }

  private _generateEntity(model: UserModel): User {
    return new User({
      id: model.id,
      emailAddress: model.activate_token,
      password: model.password,
      active: model.active,
      activateToken: model.activate_token,
    });
  }
}
