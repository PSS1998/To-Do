import { Entity, Unique, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';
import TagEntity from './tag.entity';
import ItemEntity from './item.entity';

@Entity()
export default class TaskEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  // n:1 relation with UserEntity 
  @ManyToOne( type => UserEntity , user => user.id)
  author: UserEntity;

  // 1:n relation with TagEntity 
  @OneToMany( type => TagEntity , tag => tag.id)
  tags: TagEntity[];

  // 1:n relation with ItemEntity 
  @OneToMany( type => ItemEntity , item => item.id)
  items: ItemEntity[];

}