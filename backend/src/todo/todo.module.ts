import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
// import { JwtStrategy } from '../auth/auth.module';

@Module({
  // imports: [JwtStrategy],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
