import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';

@Entity('nest_roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Job, job => job.roles)
  jobs: Job[];
}
