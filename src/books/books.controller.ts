import { BooksService } from './books.service';
import { Body, Param, Controller, Delete, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksServices: BooksService) {}

  //'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() book: CreateBookDto) {
    return this.booksServices.insert(book);
  }
  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }

  // @Delete()
  // deleteUser( @Body() user: CreateUserDto ) {
  //   return this.usersServices.deleteUser(user);
  // }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.booksServices.deleteBook(+id);
  }
  

  // @Put()
  // updateUSer( @Body() user: CreateUserDto ) {
  //   return this.usersServices.updateUser(user); 
  // }
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksServices.updateBook(+id, updateBookDto);
  }
}
