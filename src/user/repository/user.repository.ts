import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(user: User) {
    let manager = this.userRepository.manager;

    await manager.transaction(async (transactionalEntityManager) => {
      if (user.address != null) {
        await transactionalEntityManager.save(user.address);
      }
      await transactionalEntityManager.save(user);
    });
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async removeUser(id: string) {
    return await this.userRepository.delete(id);
  }

  async findToken(resetPasswordToken: string) {
    return await this.userRepository.findOne({
      where: { resetPasswordToken: resetPasswordToken },
    });
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
