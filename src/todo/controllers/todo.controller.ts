import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { PermissionsGuard } from '../../auth/guard/permission.guard';
import { Permissions } from '../../permission/decorators/permission.decorator';
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
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiSecurity } from '@nestjs/swagger/dist/decorators';
import { PaginationDto } from '../dto/todo-pagination.dto';
import { Todo } from '../entities/todo.entity';
import { TodoDisplayModel } from '../dto/todo-display-model';

@Controller('todo')
@ApiTags('Todos')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  @Permissions('u-read', 'u-write')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: string,
  ): Promise<TodoDisplayModel | false> {
    return await this.todoService.create(createTodoDto, userId);
  }

  @Get('/:userId/not-completed-todo')
  @Permissions('u-read')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async findAllTodoByUserNotCompleted(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<{
    items: Todo[];
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }> {
    return await this.todoService.findAllTodoByUserNotCompleted(
      userId,
      paginationDto,
    );
  }

  @Get('/:userId/completed-todo')
  @Permissions('u-read')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async findAllTodoByUserCompleted(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<{
    items: Todo[];
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }> {
    return await this.todoService.findAllTodoByUserCompleted(
      userId,
      paginationDto,
    );
  }

  @Patch(':todoId')
  @Permissions('u-read', 'u-write')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  async update(@Param('todoId') id: string): Promise<void> {
    return await this.todoService.update(id);
  }

  @Delete(':todoId')
  @Permissions('u-read', 'u-write')
  async remove(@Param('todoId') id: string): Promise<void> {
    return await this.todoService.remove(id);
  }
}
