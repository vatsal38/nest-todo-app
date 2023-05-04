import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  isVerified: boolean;

  @IsOptional()
  resetPasswordToken: string;

  @IsOptional()
  resetPasswordExpires: Date;

  @ApiProperty()
  @IsOptional()
  updatePermission: string[];
}
