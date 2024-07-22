import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { DatabaseService } from './database.service';
import { User } from './entities/user.entity';
import { Home } from './entities/home.entity';
import { Job } from './entities/job.entity';
import { UserToJob } from './entities/user-to-job.entity';
import { Role } from './entities/role.entity';
import datasource from './datasource';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...datasource.options,
        migrations: [],
        entities: [],
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Home, Job, Role, UserToJob]),
  ],
  providers: [UserResolver, DatabaseService],
})
export class DatabaseModule {}