import { AuditTrail } from './../../audit-list/entities/audit-trail.entity';
import { Todo } from './../entities/todo.entity';
import { Category } from '../entities/category.entity';
import { UserService } from '../../user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Repository } from 'typeorm';
import { LoggerService } from '../../utils/logger/logger.service';
import { PaginationDto } from '../dto/todo-pagination.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TodoDisplayModel } from '../dto/todo-display-model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private userService: UserService,
    private readonly loggerService: LoggerService,
    @InjectRepository(AuditTrail)
    private readonly auditTrailRepository: Repository<AuditTrail>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    userId: string,
  ): Promise<TodoDisplayModel | false> {
    const { title, tags } = createTodoDto;
    const category = await this.categoryRepository.findOne({
      where: { id: createTodoDto.categoryId },
    });
    const user = await this.userService.findUserById(userId);
    if (!category) return false;
    const date = new Date().toLocaleString();
    const todo = new Todo(uuid(), title, tags, category, date, false, user);
    this.loggerService.log(`Todo created`);
    const createTodo = await this.todoRepository.save(todo);
    const mappedTodo = this.mapper.map(createTodo, Todo, TodoDisplayModel);
    await this.createAuditTrail(createTodo.id, 'Todo Created', 'todo');
    return mappedTodo;
  }

  async findAllTodoByUserNotCompleted(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<{
    items: Todo[];
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }> {
    this.loggerService.log(`Get the list not-completed todo`);
    const { skip, take } = paginationDto;
    const skippedItems = (skip - 1) * take;
    const [todos, count] = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .leftJoinAndSelect('todo.category', 'category')
      .where('todo.user.id = :userId', { userId })
      .select([
        'todo.id',
        'todo.title',
        'category.id',
        'todo.completed',
        'user.id',
      ])
      .andWhere('todo.completed = :completed', { completed: false })
      .skip(skippedItems)
      .take(take)
      .getManyAndCount();

    return {
      items: todos,
      totalItems: count,
      currentPage: skip,
      perPage: take,
      totalPages: Math.ceil(count / take),
    };
  }

  async findAllTodoByUserCompleted(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<{
    items: Todo[];
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }> {
    this.loggerService.log(`Get the list of completed todo`);
    const { skip, take } = paginationDto;
    const skippedItems = (skip - 1) * take;
    const [todos, count] = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.user', 'user')
      .leftJoinAndSelect('todo.category', 'category')
      .select([
        'todo.id',
        'todo.title',
        'category.id',
        'todo.completed',
        'user.id',
      ])
      .where('todo.user.id = :userId', { userId })
      .andWhere('todo.completed = :completed', { completed: true })
      .skip(skippedItems)
      .take(take)
      .getManyAndCount();

    return {
      items: todos,
      totalItems: count,
      currentPage: skip,
      perPage: take,
      totalPages: Math.ceil(count / take),
    };
  }

  async update(todoId: string): Promise<any> {
    this.loggerService.log(`Update todo ${todoId}`);
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });
    if (!todo) return false;
    todo.completed = true;
    await this.todoRepository.save(todo);
    await this.createAuditTrail(todo.id, 'Todo Updated', 'todo');
    return true;
  }

  async remove(todoId: string): Promise<any> {
    this.loggerService.log(`Delete todo ${todoId}`);
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });
    if (!todo) return false;
    await this.createAuditTrail(todo.id, 'Todo Deleted', 'todo');
    await this.todoRepository.remove(todo);
    return true;
  }

  private async createAuditTrail(
    entityId: string,
    action: string,
    entityName: string,
  ): Promise<void> {
    const auditTrail = new AuditTrail();
    auditTrail.entityId = entityId;
    auditTrail.action = action;
    auditTrail.entityName = entityName;

    await this.auditTrailRepository.save(auditTrail);
  }
}
