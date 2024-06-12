import { Repository } from 'typeorm';
import { AuthenticationEntity } from '../entities/authentication.entity';

export class AuthenticationRepository extends Repository<AuthenticationEntity> {}
