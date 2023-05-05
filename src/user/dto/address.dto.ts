import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { AutoMap } from '@automapper/classes';
export class AddressDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  street: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  city: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  state: string;

  @ApiProperty()
  @IsNumber()
  @AutoMap()
  zipcode: number;
}
