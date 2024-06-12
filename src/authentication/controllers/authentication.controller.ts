import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { UserEntity } from 'src/user/entities/user.entity';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dtos';
import { RegistrationDto } from '../dtos/registration.dto';

@Controller('Authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully created user' })
  @ApiBadRequestResponse({
    description: 'User with that email already exists.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    return this._authenticationService.registration(registrationDto);
  }
}
