import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import {
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }

  async findAll(options: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return await this.userRepository.find(options);
  }

  async count(options?: FindManyOptions<UserEntity>): Promise<number> {
    return await this.userRepository.count(options);
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne(options);
  }

  async update(id: string, body: UserEntity) {
    return await this.userRepository.update(id, body);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  async findAndCount(
    options: FindManyOptions<UserEntity>,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAndCount(options);
  }

  createQueryBuilder(
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<UserEntity> {
    return this.userRepository.createQueryBuilder(alias);
  }
}
