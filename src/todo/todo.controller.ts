import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { PermissionsGuard } from '../auth/guard/permission.guard';
import { Permissions } from './../permission/decorators/permission.decorator';
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
  UseGuards,
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
  @Permissions('u-read', 'u-write')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: string,
  ) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/:userId/not-completed-todo')
  @Permissions('u-read')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
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
  @Permissions('u-read')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findAllTodoByUserCompleted(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.todoService.findAllTodoByUserCompleted(userId, paginationDto);
  }

  @Patch(':todoId')
  @Permissions('u-read', 'u-write')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  update(@Param('todoId') id: string) {
    return this.todoService.update(id);
  }

  @Delete(':todoId')
  @Permissions('u-read', 'u-write')
  remove(@Param('todoId') id: string) {
    return this.todoService.remove(id);
  }
}
