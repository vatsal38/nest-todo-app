import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
export class AddressDto {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  zipcode: number;
}
