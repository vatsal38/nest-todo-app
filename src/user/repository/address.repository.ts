import { Mapper } from '@automapper/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from '../dto/address.dto';
import { InjectMapper } from '@automapper/nestjs';
import { UserDisplayModel } from '../dto/user-display-modal';

export class AddressRepository {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async createAddress(address: AddressDto) {
    return await this.addressRepository.save(address);
  }
  async findAddressById(id: string) {
    return await this.addressRepository.findOne({ where: { id: id } });
  }
}
