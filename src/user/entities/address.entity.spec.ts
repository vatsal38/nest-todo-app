/* eslint-disable prettier/prettier */
import { Address } from './address.entity';

describe('AddressEntity', () => {
  let address: Address;

  beforeEach(() => {
    address = new Address('addressId', '123 Street', 'City', 'State', 12345);
  });
  it('should create an address entity', () => {
    expect(address).toBeInstanceOf(Address);
    expect(address.id).toEqual('addressId');
    expect(address.street).toEqual('123 Street');
    expect(address.city).toEqual('City');
    expect(address.state).toEqual('State');
    expect(address.zipcode).toEqual(12345);
  });
});
