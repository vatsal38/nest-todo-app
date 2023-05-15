/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { AuditTrail } from './../audit-trail/entities/audit-trail.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditTrail)
    private readonly auditRepository: Repository<AuditTrail>,
  ) {}

  async findAll(): Promise<any> {
    return await this.auditRepository.find();
  }
}
