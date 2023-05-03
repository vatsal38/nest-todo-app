import { Connection } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Constants } from './utils/constants';
export default async function seedUsers(connection: Connection) {
  const users = [
    {
      firstName: 'abc',
      lastName: 'abc',
      email: 'abc@abc.com',
      password: 'abc',
      address: null,
      role: Constants.ROLES.ADMIN_ROLE,
      Permissions: ['u-read', 'u-write', 'a-read', 'a-write'],
    },
    {
      firstName: 'seed',
      lastName: 'seed',
      email: 'seed@seed.com',
      password: 'seed',
      address: null,
      role: Constants.ROLES.ADMIN_ROLE,
      Permissions: ['u-read', 'u-write', 'a-read', 'a-write'],
    },
  ];
  const existingEmails = await connection.getRepository(User).find({
    select: ['email'],
  });
  const uniqueUsers = users.filter((user) => {
    return !existingEmails.some((emailObj) => emailObj.email === user.email);
  });
  await connection.getRepository(User).save(uniqueUsers);
}
