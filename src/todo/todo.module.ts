import { PermissionsGuard } from '../auth/guard/permission.guard';
import { LoggerService } from '../utils/logger/logger.service';
import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { Todo } from './entities/todo.entity';
import { Category } from './entities/category.entity';
import { ToDoMapper } from './mapper/todo-mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category]), UserModule],
  controllers: [TodoController],
  providers: [TodoService, LoggerService, PermissionsGuard,ToDoMapper],
})
export class TodoModule {}
