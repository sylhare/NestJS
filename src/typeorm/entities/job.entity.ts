import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToJob } from './user-to-job.entity';
import { Role } from './role.entity';

@Entity('nest_jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => UserToJob, (userToJob) => userToJob.job)
  jobToUsers: UserToJob[];

  @ManyToMany(() => Role, role => role.jobs)
  @JoinTable()
  roles: Role[];
}