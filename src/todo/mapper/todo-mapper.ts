import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodoDisplayModel } from '../dto/todo-display-model';

@Injectable()
export class ToDoMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Todo,
        TodoDisplayModel,
        forMember(
          (d) => d.tags,
          mapFrom((source) => source.tags),
        ),
        forMember(
          (d) => d.user.id,
          mapFrom((source) => source.user.id),
        ),
      );
    };
  }
}
