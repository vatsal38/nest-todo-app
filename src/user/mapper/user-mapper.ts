import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateUserDto, User);
      createMap(mapper, AddressDto, User);
    };
  }
}
