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
    },
    {
      firstName: 'seed',
      lastName: 'abc',
      email: 'seed@seed.com',
      password: 'seed',
      address: null,
      role: Constants.ROLES.ADMIN_ROLE,
    },
  ];

  await connection.getRepository(User).save(users);
}
