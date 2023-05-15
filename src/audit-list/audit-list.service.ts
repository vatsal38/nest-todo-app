/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { PaginationDto } from './../todo/dto/todo-pagination.dto';
import { Repository } from 'typeorm';
import { AuditTrail } from './../audit-list/entities/audit-trail.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditTrail)
    private readonly auditRepository: Repository<AuditTrail>,
  ) {}
  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { skip, take } = paginationDto;
    const skippedItems = (skip - 1) * take;
    const [auditList, count] = await this.auditRepository
      .createQueryBuilder('audit-trail')
      .skip(skippedItems)
      .take(take)
      .getManyAndCount();

    return {
      items: auditList,
      totalItems: count,
      currentPage: skip,
      perPage: take,
      totalPages: Math.ceil(count / take),
    };
  }
}
