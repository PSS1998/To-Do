import { UseGuards, Body, Param, Controller, Delete, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';


@Controller('user')
export class UserController {
  constructor(private readonly usersServices: UserService) {}

  //'postUser()' will handle the creating of new User
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'username',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'password',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }

  // 'getAll()' returns the list of all the existing users in the database
  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    // console.log(JwtAuthGuard.arguments.username);
    return this.usersServices.getAllUsers();
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersServices.deleteUser(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersServices.updateUser(+id, updateUserDto);
  }

}