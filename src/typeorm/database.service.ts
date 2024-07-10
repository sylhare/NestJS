import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';
import { Job } from './entities/job.entity';

export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async createUser(name: string): Promise<User> {
    const user = this.userRepository.create({ name });
    this.logger.log(`Creating user: ${JSON.stringify(user)}`);
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['home', 'userToJobs', 'userToJobs.job'],
    });
  }

  async getJobsById(id: number): Promise<Job> {
    //return this.userRepository.manager.findOne(Job, {
    return this.jobRepository.findOne({
      where: { id },
      relations: ['roles', 'jobToUsers', 'jobToUsers.user'],
    });
  }
}