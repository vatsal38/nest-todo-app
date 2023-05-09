import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { AddressDto } from './address.dto';

export class UserDisplayModel {
  @ApiProperty({ example: uuid() })
  @AutoMap()
  id: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  firstName: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  lastName: string;

  @AutoMap()
  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  email: string;

  @ApiProperty({ example: ['string'] })
  @AutoMap()
  permissions: string[];

  @ApiProperty({ example: 'string' })
  @AutoMap()
  role: string;
}
