import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule, UserModule, TodoModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
