import { Category } from '../entities/category.entity';
import { UserService } from '../../user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../../utils/logger/logger.service';
import { PaginationDto } from '../dto/todo-pagination.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: createTodoDto.categoryId },
    });
    const { title, tags } = createTodoDto;
    if (!category) return false;
    let todo = new Todo();
    todo.title = title;
    todo.tags = tags;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.category = category;
    todo.user = await this.userService.findUserById(userId);
    this.loggerService.log(`Todo created`);
    return await this.todoRepository.save(todo);
  }

  async findAllTodoByUserNotCompleted(
    userId: string,
    paginationDto: PaginationDto,
  ) {
    this.loggerService.log(`Get the list not-completed todo`);
    const { page, perPage } = paginationDto;
    const skippedItems = (page - 1) * perPage;
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
      .take(perPage)
      .getManyAndCount();

    return {
      items: todos,
      totalItems: count,
      currentPage: page,
      perPage: perPage,
      totalPages: Math.ceil(count / perPage),
    };
  }

  async findAllTodoByUserCompleted(
    userId: string,
    paginationDto: PaginationDto,
  ) {
    this.loggerService.log(`Get the list of completed todo`);
    const { page, perPage } = paginationDto;
    const skippedItems = (page - 1) * perPage;
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
      .take(perPage)
      .getManyAndCount();

    return {
      items: todos,
      totalItems: count,
      currentPage: page,
      perPage: perPage,
      totalPages: Math.ceil(count / perPage),
    };
  }

  update(todoId: string) {
    this.loggerService.log(`Update todo ${todoId}`);
    return this.todoRepository.update(todoId, { completed: true });
  }

  remove(todoId: string) {
    this.loggerService.log(`Delete todo ${todoId}`);
    return this.todoRepository.delete(todoId);
  }
}
