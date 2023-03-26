import { UseGuards, Body, Param, Controller, Delete, Get, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import CreateTaskDto from './dto/create-task.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateTagDto from './dto/create-tag.dto';
import UpdateTaskDto from './dto/update-task.dto';
import UpdateItemDto from './dto/update-item.dto';
import UpdateTagDto from './dto/update-tag.dto';
import TaskEntity from '../db/task.entity';
import ItemEntity from '../db/item.entity';
import TagEntity from '../db/tag.entity';
import UserEntity from '../db/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import * as jwt from 'jsonwebtoken';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'title',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Post('task/post')
  async postTask( @Req() request: Request, @Body() taskDto: CreateTaskDto) {
    const jwtToken: string = request.headers.authorization;
    const jwtDecoded: any = jwt.decode(jwtToken.split(" ")[1]);
    console.log(jwtDecoded)
    const user: UserEntity = await UserEntity.findOne({where: {username: jwtDecoded.username}});
    return this.todoService.insertTask(user.id, taskDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'description',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Post('item/post')
  async postItem( @Body() itemDto: CreateItemDto) {
    return this.todoService.insertItem(itemDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Post('tag/post')
  async postTag( @Body() tagDto: CreateTagDto) {
    return this.todoService.insertTag(tagDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Get('task')
  async getTask( @Req() request: Request) {
    const jwtToken = request.headers.authorization;
    const jwtDecoded: any = jwt.decode(jwtToken.split(" ")[1]);
    const user: UserEntity = await UserEntity.findOne({where: {username: jwtDecoded.username}});
    return this.todoService.getAllTasks(user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'taskID',
    required: true,
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Get('item')
  async getItem( @Body('taskID', ParseIntPipe) taskID: number) {
    return this.todoService.getAllItems(taskID);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'taskID',
    required: true,
    type: Number,
  })
  @UseGuards(JwtAuthGuard)
  @Get('tag')
  async getTag( @Body('taskID', ParseIntPipe) taskID: number) {
    return this.todoService.getAllTags(taskID);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('task/delete/:id')
  async deleteTask( @Param('id') id: string) {
    return this.todoService.deleteTask(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('item/delete/:id')
  async deleteItem( @Param('id') id: string) {
    return this.todoService.deleteItem(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('tag/delete/:id')
  async deleteTag( @Param('id') id: string) {
    return this.todoService.deleteTag(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'taskID',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'title',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Put('task/update/:id')
  async updateTask( @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.todoService.updateTask(+id, updateTaskDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'taskID',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'description',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Put('item/update/:id')
  async updateItem( @Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.todoService.updateItem(+id, updateItemDto);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200})
  @ApiQuery({
    name: 'taskID',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    required: true,
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Put('tag/update/:id')
  async updateTag( @Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.todoService.updateTag(+id, updateTagDto);
  }

}
