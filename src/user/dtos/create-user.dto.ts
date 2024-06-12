import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthenticationDto } from 'src/authentication/dtos/create-authentication.dto';

export class CreateUserDto extends CreateAuthenticationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
}
