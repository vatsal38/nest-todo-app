/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuditFilterDto {
  @IsOptional()
  @ApiPropertyOptional()
  entityId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  action?: string;

  @IsOptional()
  @ApiPropertyOptional()
  startDate?: Date;

  @IsOptional()
  @ApiPropertyOptional()
  endDate?: Date;
}
