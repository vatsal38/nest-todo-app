import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsEmail, IsUUID } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
