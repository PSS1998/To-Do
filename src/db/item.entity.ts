import { Entity, Unique, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import TaskEntity from './task.entity';

@Entity()
export default class ItemEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  // n:1 relation with TaskEntity 
  @ManyToOne( type => TaskEntity , task => task.id, { onDelete: "CASCADE" })
  task: TaskEntity;

}