import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user';
import { AuthenticationRepository } from './repositories/authentication.repository';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AuthenticationRepository])],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
