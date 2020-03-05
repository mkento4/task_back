import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserInterface {
  usersId: number,
  contentsJson: JSON,
  updatedAt: Date
}

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'users_id', type: 'int' })
  usersId!: number;


  @Column({ name: 'contents_json', type: 'json' })
  contentsJson!: JSON;

  @Column({ name: 'createdAt', type: 'date' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updatedAt', type: 'date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.usersId = (obj && obj.usersId) || this.usersId;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
    this.contentsJson = (obj && obj.contentsJson) || this.contentsJson;
  }

  /// no commit with update
  update(obj?: UserInterface) {
    this.usersId = (obj && obj.usersId) || this.usersId;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
    this.contentsJson = (obj && obj.contentsJson) || this.contentsJson;
  }
}
