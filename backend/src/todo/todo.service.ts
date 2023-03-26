import { Injectable } from '@nestjs/common';
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

// TODO: check owner of Tag and Item

@Injectable()
export class TodoService {

    async insertTask(userID: number, taskDetails: CreateTaskDto): Promise<TaskEntity> {

        const taskEntity: TaskEntity = TaskEntity.create();
        const {title} = taskDetails;
        
        const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
        taskEntity.author = user;
        taskEntity.title = title;
        await TaskEntity.save(taskEntity);
        return taskEntity;
    }
    
    async insertItem(itemDetails: CreateItemDto): Promise<ItemEntity> {

        const itemEntity: ItemEntity = ItemEntity.create();
        const {description, task} = itemDetails;
    
        const itemOwner: TaskEntity = await TaskEntity.findOne({where: {id: task}});
        itemEntity.description = description;
        itemEntity.task = itemOwner;
        await ItemEntity.save(itemEntity);
        return itemEntity;
    }

    async insertTag(tagDetails: CreateTagDto): Promise<TagEntity> {

        const tagEntity: TagEntity = TagEntity.create();
        const {name, task} = tagDetails;
    
        const tagOwner: TaskEntity = await TaskEntity.findOne({where: {id: task}});
        tagEntity.name = name;
        tagEntity.task = tagOwner;
        await TagEntity.save(tagEntity);
        return tagEntity;
    }

    async getAllTasks(userID: number): Promise<TaskEntity[]> {
        const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
        return await TaskEntity.find({where: {author: user}});
    }

    async getAllItems(taskID: number): Promise<ItemEntity[]> {
        const itemOwner: TaskEntity = await TaskEntity.findOne({where: {id: taskID}});
        return await ItemEntity.find({where: {task: itemOwner}});
    }

    async getAllTags(taskID: number): Promise<TagEntity[]> {
        const tagOwner: TaskEntity = await TaskEntity.findOne({where: {id: taskID}});
        return await TagEntity.find({where: {task: tagOwner}});
    }
    
    async deleteTask(taskID: number): Promise<any> {
        return await TaskEntity.delete(taskID);
    }

    async deleteItem(itemID: number): Promise<any> {
        return await ItemEntity.delete(itemID);
    }

    async deleteTag(tagID: number): Promise<any> {
        return await TagEntity.delete(tagID);
    }
    
    async updateTask(taskID: number, taskDetails: UpdateTaskDto): Promise<TaskEntity> {
        const taskEntity: TaskEntity = await TaskEntity.findOne({where: {id: taskID}});
        const {title } = taskDetails;
        taskEntity.title = title;
        await TaskEntity.update(taskID, taskEntity);
        return taskEntity;
    }

    async updateItem(itemID: number, itemDetails: UpdateItemDto): Promise<ItemEntity> {
        const itemEntity: ItemEntity = await ItemEntity.findOne({where: {id: itemID}});
        const {description } = itemDetails;
        itemEntity.description = description;
        await ItemEntity.update(itemID, itemEntity);
        return itemEntity;
    }

    async updateTag(tagID: number, tagDetails: UpdateTagDto): Promise<TagEntity> {
        const tagEntity: TagEntity = await TagEntity.findOne({where: {id: tagID}});
        const {name } = tagDetails;
        tagEntity.name = name;
        await TagEntity.update(tagID, tagEntity);
        return tagEntity;
    }

}
