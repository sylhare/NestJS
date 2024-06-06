import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';

@Entity('users_to_jobs')
export class UserToJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  jobId: number;

  @ManyToOne(() => User, (user) => user.userToJobs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Job, (job) => job.jobToUsers)
  @JoinColumn({ name: 'jobId' })
  job: Job;
}