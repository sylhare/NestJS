import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToJob } from './user-to-job.entity';

@Entity('nest_jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => UserToJob, (userToJob) => userToJob.job)
  jobToUsers: UserToJob[];
}