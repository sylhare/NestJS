import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('nest_homes')
export class Home {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  address: string;

  @OneToMany(() => User, (user) => user.home)
  inhabitants: User[];
}