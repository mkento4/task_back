import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface UserInterface {
  userCompaniesId: number,
  name: string,
  startDate: Date,
  endDate: Date,
  status: number,
  color: string,
  overview: string,
  updatedAt: Date
}

@Entity('projects')
export class Projects {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ name: 'user_companies_id', type: 'int' })
  userCompaniesId!: number;


  @Column({ name: 'name', type: 'varchar',length: '255'})
  name!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: Date;
    
  @Column({ name: 'end_date', type: 'date' })
  endDate!: Date;

  @Column({ name: 'status', type: 'int' })
  status!: number;

  @Column({ name: 'color', type: 'varchar', length: '255' })
  color!: string;

  @Column({ name: 'overview', type: 'text' })
  overview!: string;

  @Column({ name: 'createdAt', type: 'date' })
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column({ name: 'updatedAt', type: 'date' })
  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(obj?: UserInterface) {
    this.userCompaniesId = (obj && obj.userCompaniesId) || this.userCompaniesId;
    this.name = (obj && obj.name) || this.name;
    this.startDate = (obj && obj.startDate) || this.startDate;
    this.endDate = (obj && obj.endDate) || this.endDate;
    this.status = (obj && obj.status) || this.status;
    this.color = (obj && obj.color) || this.color;
    this.overview = (obj && obj.overview) || this.overview;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }

  /// no commit with update
  update(obj?: UserInterface) {
    this.userCompaniesId = (obj && obj.userCompaniesId) || this.userCompaniesId;
    this.name = (obj && obj.name) || this.name;
    this.startDate = (obj && obj.startDate) || this.startDate;
    this.endDate = (obj && obj.endDate) || this.endDate;
    this.status = (obj && obj.status) || this.status;
    this.color = (obj && obj.color) || this.color;
    this.overview = (obj && obj.overview) || this.overview;
    this.updatedAt = (obj && obj.updatedAt) || this.updatedAt;
  }
}
