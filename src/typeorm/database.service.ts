import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    await this.userRepository.save(user);
    this.logger.log(`User created: ${name}`);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}