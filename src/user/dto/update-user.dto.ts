import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @AutoMap()
  resetPasswordToken: string;

  @IsOptional()
  @AutoMap()
  resetPasswordExpires: Date;

  @ApiProperty()
  @IsOptional()
  @AutoMap()
  permissions: string[];
}
