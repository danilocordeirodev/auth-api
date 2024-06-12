import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import { UserService } from 'src/user/services/user.service';
import { Connection, QueryRunner } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostgresErrorCode } from 'src/database/constraints/errors.constraints';
import { CreateAuthenticationDto } from '../dtos/create-authentication.dto';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { RegistrationDto } from '../dtos/registration.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _authenticationRepository: AuthenticationRepository,
    private readonly _userService: UserService,
    private readonly _connection: Connection,
  ) {}

  async registration(registrationDto: RegistrationDto): Promise<UserEntity> {
    let user: UserEntity;
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const authentication = await this._createAuthentication(
        registrationDto,
        queryRunner,
      );

      user = await this._userService.createUser(
        registrationDto,
        authentication,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  private async _createAuthentication(
    createAuthenticationDto: CreateAuthenticationDto,
    queryRunner: QueryRunner,
  ): Promise<AuthenticationEntity> {
    const authentication = this._authenticationRepository.create(
      createAuthenticationDto,
    );

    return queryRunner.manager.save(authentication);
  }
}
