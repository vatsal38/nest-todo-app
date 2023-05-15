import { AuditTrail } from './../../audit-list/entities/audit-trail.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditTrail)
    private auditTrailRepository: Repository<AuditTrail>,
  ) {}

  async createUser(user: User): Promise<User> {
    const manager = this.userRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      if (user.address !== null) {
        await transactionalEntityManager.save(user.address);
      }
      await transactionalEntityManager.save(user);
      await this.createAuditTrail(user.id, 'User Created', 'user');
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .getMany();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.id = :id', { id })
      .getOne();
  }

  async removeUser(id: string): Promise<any> {
    await this.userRepository.delete(id);
    await this.createAuditTrail(id, 'User Deleted', 'user');
  }

  async findToken(resetPasswordToken: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { resetPasswordToken: resetPasswordToken },
    });
  }

  async updateUser(user: User): Promise<User> {
    const manager = this.userRepository.manager;
    await manager.transaction(async (transactionalEntityManager) => {
      if (user.permissions !== null) {
        await transactionalEntityManager.save(user.address);
      }
      user.updatedAt = new Date();
      await transactionalEntityManager.save(user);
      await this.createAuditTrail(user.id, 'User Updated', 'user');
    });
    return user;
  }

  private async createAuditTrail(
    entityId: string,
    action: string,
    entityName: string,
  ): Promise<void> {
    const auditTrail = new AuditTrail();
    auditTrail.entityId = entityId;
    auditTrail.action = action;
    auditTrail.entityName = entityName;

    await this.auditTrailRepository.save(auditTrail);
  }
}
