import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Home } from './entities/home.entity';
import { Job } from './entities/job.entity';
import { UserToJob } from './entities/user-to-job.entity';
import datasource from './datasource';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(datasource.options, {
          migrations: [],
          entities: [],
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([User, Home, Job, UserToJob]),
  ],
})
export class DatabaseModule {}