import { IsOptional, IsInt, Min, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({ default: 0 })
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ default: 10 })
  perPage?: number;
}
