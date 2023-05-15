/* eslint-disable prettier/prettier */
import { PaginationDto } from '../../todo/dto/todo-pagination.dto';
import { Repository } from 'typeorm';
import { AuditTrail } from '../entities/audit-trail.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditFilterDto } from '../dto/audit-filter.dto';
import * as moment from 'moment';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditTrail)
    private readonly auditRepository: Repository<AuditTrail>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
    filter: AuditFilterDto,
  ): Promise<any> {
    const { skip, take } = paginationDto;
    const { entityId, action, startDate, endDate } = filter;
    const skippedItems = (skip - 1) * take;

    const formattedStartDate = moment(startDate).format('DDMMYYYY');
    const formattedEndDate = moment(endDate).format('DDMMYYYY');

    const queryBuilder = this.auditRepository.createQueryBuilder('audit_trail');

    if (entityId) {
      queryBuilder.andWhere('audit_trail.entity_id = :entityId', {
        entityId: filter.entityId,
      });
    }
    if (action) {
      queryBuilder.andWhere('audit_trail.action = :action', {
        action: filter.action,
      });
    }

    const [auditList, count] = await queryBuilder
      .where(`to_char(audit_trail.createdAt, 'DDMMYYYY') >= :startDate`, {
        startDate: formattedStartDate,
      })
      .andWhere(`to_char(audit_trail.createdAt, 'DDMMYYYY') <= :endDate`, {
        endDate: formattedEndDate,
      })
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
