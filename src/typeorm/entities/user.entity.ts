import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Home } from './home.entity';
import { UserToJob } from './user-to-job.entity';

@Entity('nest_users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, nullable: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Home, (home) => home.inhabitants, { onDelete: 'CASCADE' })
  home: Home;

  @OneToMany(() => UserToJob, (userToJob) => userToJob.user)
  userToJobs: UserToJob[];
}