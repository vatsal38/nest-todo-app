import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from '../dto/address.dto';

export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async createAddress(address: AddressDto) {
    return await this.addressRepository.save(address);
  }
}
