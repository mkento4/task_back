import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserInterface {
  replyId: number;
  usersId: number;
  niceCnt: number;
  taskId: number;
  comment: string;
  updatedAt: Date;
}

@Entity('task_comments')
export class TaskComments {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'task_id', type: 'int' })
  taskId!: number;

  @Column({ name: 'users_id', type: 'int' })
  usersId!: number;

  @Column({ name: 'comment', type: 'text' })
  comment!: string;

  @Column({ name: 'reply_id', type: 'int' })
  replyId!: number;

  @Column({ name: 'nice_cnt', type: 'int' })
  niceCnt!: number;

  @Column({ name: 'createdAt', type: 'date' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updatedAt', type: 'date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.usersId = (obj && obj.usersId) || this.usersId;
    this.taskId = (obj && obj.taskId) || this.taskId;
    this.comment = (obj && obj.comment) || this.comment;
    this.replyId = (obj && obj.replyId) || this.replyId;
    this.niceCnt = (obj && obj.niceCnt) || this.niceCnt;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }

  /// no commit with update
  update(obj?: UserInterface) {
    this.usersId = (obj && obj.usersId) || this.usersId;
    this.taskId = (obj && obj.taskId) || this.taskId;
    this.comment = (obj && obj.comment) || this.comment;
    this.replyId = (obj && obj.replyId) || this.replyId;
    this.niceCnt = (obj && obj.niceCnt) || this.niceCnt;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }
}
