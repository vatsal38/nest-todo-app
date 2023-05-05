import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  tags: string[];

  @ApiProperty()
  @AutoMap()
  categoryId: string;
}
