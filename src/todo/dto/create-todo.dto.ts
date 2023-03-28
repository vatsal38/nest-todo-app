import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  tags: string[];
}
