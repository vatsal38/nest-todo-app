import { ApiTags } from '@nestjs/swagger/dist';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiSecurity } from '@nestjs/swagger/dist/decorators';
import { PaginationDto } from './dto/todo-pagination.dto';

@Controller('todo')
@ApiTags('Todos')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: string,
  ) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/:userId/not-completed-todo')
  findAllTodoByUserNotCompleted(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.todoService.findAllTodoByUserNotCompleted(
      userId,
      paginationDto,
    );
  }
  @Get('/:userId/completed-todo')
  findAllTodoByUserCompleted(@Param('userId') userId: string) {
    return this.todoService.findAllTodoByUserCompleted(userId);
  }

  @Patch(':todoId')
  update(@Param('todoId') id: string) {
    return this.todoService.update(id);
  }

  @Delete(':todoId')
  remove(@Param('todoId') id: string) {
    return this.todoService.remove(id);
  }
}
