import { LoggerService } from './../logger.service';
import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category]), UserModule],
  controllers: [TodoController],
  providers: [TodoService, LoggerService],
})
export class TodoModule {}
