import { User } from './../../user/entities/user.entity';
import { Category } from './../entities/category.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class TodoDisplayModel {
  @ApiProperty({ example: uuid() })
  @AutoMap()
  id: string;

  @ApiProperty({ example: 'string' })
  @AutoMap()
  title: string;

  @ApiProperty({ example: ['string'] })
  @AutoMap()
  tags: string[];

  @ApiProperty()
  @AutoMap()
  category: Category;

  @ApiProperty()
  @AutoMap()
  user: User;
}
