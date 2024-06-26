import { QueryRunner } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { AuthenticationEntity } from 'src/authentication/entities/authentication.entity';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    authentication: AuthenticationEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto,
      authentication,
    });

    return queryRunner.manager.save(user);
  }
}
