import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserInterface {
  users_id: number,
  contents_json: JSON,
  updatedAt: Date
}

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'users_id', type: 'number' })
  users_id!: number;


  @Column({ name: 'contents_json', type: 'json' })
  contents_json!: JSON;

  @Column({ name: 'createdAt', type: 'date' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updatedAt', type: 'date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.users_id = (obj && obj.users_id) || this.users_id;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
    this.contents_json = (obj && obj.contents_json) || this.contents_json;
  }

  /// no commit with update
  update(obj?: UserInterface) {
    this.users_id = (obj && obj.users_id) || this.users_id;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
    this.contents_json = (obj && obj.contents_json) || this.contents_json;
  }
}
