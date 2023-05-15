/* eslint-disable prettier/prettier */
import { PaginationDto } from '../../todo/dto/todo-pagination.dto';
import { Permissions } from '../../permission/decorators/permission.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { RoleGuard } from '../../auth/guard/role.guard';
import { PermissionsGuard } from '../../auth/guard/permission.guard';
import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuditService } from '../service/audit-list.service';
import { AuditFilterDto } from '../dto/audit-filter.dto';

@Controller('audit-list')
@ApiTags('Audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}
  @ApiSecurity('JWT-auth')
  @Get()
  @Permissions('a-read')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filter: AuditFilterDto,
  ): Promise<any> {
    return await this.auditService.findAll(paginationDto, filter);
  }
}
