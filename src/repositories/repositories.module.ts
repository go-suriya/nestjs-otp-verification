import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class RepositoriesModule {}
