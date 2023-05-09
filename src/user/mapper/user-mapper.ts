import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AddressDto } from '../dto/address.dto';
import { Address } from '../entities/address.entity';
import { UserDisplayModel } from '../dto/user-display-modal';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserDisplayModel,
        forMember(
          (d) => d.permissions,
          mapFrom((source) => source.permissions),
        ),
      );
      createMap(mapper, Address, AddressDto);
    };
  }
}
