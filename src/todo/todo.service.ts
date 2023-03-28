import { UserService } from './../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/logger.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: string) {
    let todo = new Todo();
    todo.title = createTodoDto.title;
    todo.tags = createTodoDto.tags;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);
    this.loggerService.log(`Todo created`);
    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: string) {
    this.loggerService.log(`Get not completed todo`);
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllTodoByUserCompleted(userId: string) {
    this.loggerService.log(`Get completed todo`);
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
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
