/* eslint-disable prettier/prettier */
import { User } from './../../user/entities/user.entity';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { AuditTrail } from './audit-trail.entity';
import { Repository } from 'typeorm';

@EventSubscriber()
export class AuditTrailSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    @InjectConnection()
    readonly connection: Connection,
    @InjectRepository(AuditTrail)
    private auditTrailRepository: Repository<AuditTrail>,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<any> {
    await this.createAuditTrail(event.entity.id, 'User Created', 'user');
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
    await this.createAuditTrail(event.entity.id, 'User Updated', 'user');
  }

  async beforeRemove(event: RemoveEvent<User>): Promise<any> {
    await this.createAuditTrail(event.entity.id, 'User Deleted', 'user');
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
