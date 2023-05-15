import { IsOptional, Min, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional()
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional()
  take?: number;
}
