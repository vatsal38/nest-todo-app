import { Category } from './entities/category.entity';
import { UserService } from './../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger.service';

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

    if (!category) return false;
    let todo = new Todo();
    todo.title = createTodoDto.title;
    todo.tags = createTodoDto.tags;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.category = category;
    todo.user = await this.userService.findUserById(userId);
    this.loggerService.log(`Todo created`);
    return await this.todoRepository.save(todo);
  }

  async findAllTodoByUserNotCompleted(userId: string) {
    this.loggerService.log(`Get not completed todo`);
    // return this.todoRepository.find({
    //   relations: ['user', 'category'],
    //   where: { user: { id: userId }, completed: false },
    // });
    return await this.todoRepository
      .createQueryBuilder('todo')
      // .leftJoin('todo.user', 'user')
      // .leftJoin('todo.category', 'category')
      // .where('todo.user.id = :userId', { userId })
      // .andWhere('todo.completed = :completed', { completed: false })
      // .select([
      //   'todo.id',
      //   'todo.title',
      //   'todo.tags',
      //   'todo.category',
      //   'user.id',
      //   'category.id',
      // ])

      .leftJoinAndSelect('todo.user', 'user')
      .leftJoinAndSelect('todo.category', 'category')
      .where('todo.user.id = :userId', { userId })
      .andWhere('todo.completed = :completed', { completed: false })
      .getMany();
  }

  async findAllTodoByUserCompleted(userId: string) {
    this.loggerService.log(`Get completed todo`);
    // return this.todoRepository.find({
    //   relations: ['user', 'category'],
    //   where: { user: { id: userId }, completed: true },
    // });

    return await this.todoRepository
      .createQueryBuilder('todo')
      // .leftJoin('todo.user', 'user')
      // .leftJoin('todo.category', 'category')
      // .where('todo.user.id = :userId', { userId })
      // .andWhere('todo.completed = :completed', { completed: true })
      // .select([
      //   'todo.id',
      //   'todo.title',
      //   'todo.tags',
      //   'todo.category',
      //   'user.id',
      //   'category.id',
      // ])

      .leftJoinAndSelect('todo.user', 'user')
      .leftJoinAndSelect('todo.category', 'category')
      .where('todo.user.id = :userId', { userId })
      .andWhere('todo.completed = :completed', { completed: true })
      .getMany();
  }

  update(todoId: string) {
    this.loggerService.log(`Update todo`);
    return this.todoRepository.update(todoId, { completed: true });
  }

  remove(todoId: string) {
    this.loggerService.log(`Delete todo`);
    return this.todoRepository.delete(todoId);
  }
}
