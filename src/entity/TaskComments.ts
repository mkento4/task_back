import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserInterface {
  reply_id: number;
  users_id: number;
  nice_cnt: number;
  task_id: number;
  comment: string;
  updatedAt: Date;
}

@Entity('task_comments')
export class TaskComments {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'task_id', type: 'int' })
  task_id!: number;

  @Column({ name: 'users_id', type: 'int' })
  users_id!: number;

  @Column({ name: 'comment', type: 'text' })
  comment!: string;

  @Column({ name: 'reply_id', type: 'int' })
  reply_id!: number;

  @Column({ name: 'nice_cnt', type: 'int' })
  nice_cnt!: number;

  @Column({ name: 'createdAt', type: 'date' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updatedAt', type: 'date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.users_id = (obj && obj.users_id) || this.users_id;
    this.task_id = (obj && obj.task_id) || this.task_id;
    this.comment = (obj && obj.comment) || this.comment;
    this.reply_id = (obj && obj.reply_id) || this.reply_id;
    this.nice_cnt = (obj && obj.nice_cnt) || this.nice_cnt;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }

  /// no commit with update
  update(obj?: UserInterface) {
    this.users_id = (obj && obj.users_id) || this.users_id;
    this.task_id = (obj && obj.task_id) || this.task_id;
    this.comment = (obj && obj.comment) || this.comment;
    this.reply_id = (obj && obj.reply_id) || this.reply_id;
    this.nice_cnt = (obj && obj.nice_cnt) || this.nice_cnt;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }
}
