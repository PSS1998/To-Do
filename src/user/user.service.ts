import { Injectable } from '@nestjs/common';
import UserEntity from '../db/user.entity';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import BookEntity from '../db/book.entity';
import {getConnection} from "typeorm";

@Injectable()
export class UserService {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {name } = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async findOne(username: string): Promise<UserEntity> {
    const user: UserEntity = await UserEntity.findOne({where: {username: username}});
    return user;
  }

  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof(userID));
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }

  async deleteUser(userID: number): Promise<any> {
    return await UserEntity.delete(userID);
  }

  async updateUser(userID: number, userDetails: UpdateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = await UserEntity.findOne({where: {id: userID}});
    const {name } = userDetails;
    userEntity.name = name;
    await UserEntity.update(userID, userEntity);
    return userEntity;
  }

}