/* eslint-disable prettier/prettier */
import { Permission } from './permission.entity';

describe('PermissionEntity', () => {
  let permission: Permission;

  beforeEach(() => {
    permission = new Permission(1, 'Permission Name', 'p123');
  });

  it('should create a permission entity', () => {
    expect(permission).toBeInstanceOf(Permission);
    expect(permission.id).toEqual(1);
    expect(permission.name).toEqual('Permission Name');
    expect(permission.pId).toEqual('p123');
  });
});
