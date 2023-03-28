import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsEmail, IsUUID, IsObject } from 'class-validator';

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

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty()
  @IsString()
  password: string;
}
