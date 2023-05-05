import { AutoMap } from '@automapper/classes';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty({ type: AddressDto })
  @AutoMap()
  address: AddressDto;

  @ApiProperty()
  @IsString()
  @AutoMap()
  password: string;
}
