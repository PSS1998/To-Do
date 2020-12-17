import { Body, Param, Controller, Delete, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersServices: UserService) {}

  //'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

  //'getBooks()' return all the books which are associated with the user 
  // provided through 'userID' by the request  
  @Get('books')
  getBooks( @Body('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }

  // @Delete()
  // deleteUser( @Body() user: CreateUserDto ) {
  //   return this.usersServices.deleteUser(user);
  // }
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersServices.deleteUser(+id);
  }
  

  // @Put()
  // updateUSer( @Body() user: CreateUserDto ) {
  //   return this.usersServices.updateUser(user); 
  // }
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersServices.updateUser(+id, updateUserDto);
  }

}