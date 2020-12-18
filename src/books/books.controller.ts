import { BooksService } from './books.service';
import { UseGuards, Body, Param, Controller, Delete, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth} from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksServices: BooksService) {}

  //'postUser()' will handle the creating of new User
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('post')
  // postBook( @Body() book: CreateBookDto) {
  //   return this.booksServices.insert(book);
  // }

  // 'getAll()' returns the list of all the existing users in the database
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.booksServices.deleteBook(+id);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksServices.updateBook(+id, updateBookDto);
  }

}
