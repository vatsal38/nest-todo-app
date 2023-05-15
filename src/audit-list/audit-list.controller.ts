/* eslint-disable prettier/prettier */
import { PaginationDto } from './../todo/dto/todo-pagination.dto';
import { Permissions } from './../permission/decorators/permission.decorator';
import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { RoleGuard } from './../auth/guard/role.guard';
import { PermissionsGuard } from './../auth/guard/permission.guard';
import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit-list.service';

@Controller('audit-list')
@ApiTags('Audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}
  @ApiSecurity('JWT-auth')
  @Get()
  @Permissions('a-read')
  @UseGuards(JwtAuthGuard, RoleGuard, PermissionsGuard)
  async findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    return await this.auditService.findAll(paginationDto);
  }
}
