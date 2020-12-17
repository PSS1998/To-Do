import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { UserModule } from './User/user.module';
import { BooksModule } from './Books/books.module';
import { GenreModule } from './Genre/genre.module';

@Module({
  imports: [HelloModule, BooksModule, GenreModule, UserModule,
    TypeOrmModule.forFeature(
      [UserEntity, BookEntity , GenreEntity],
    ),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
