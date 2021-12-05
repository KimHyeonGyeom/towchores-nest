import {
  Repository,
  EntityRepository,
  EntityManager,
  TransactionManager,
  QueryFailedError,
} from 'typeorm';
import { Users } from '../entities/Users';
import { HttpException, Injectable } from '@nestjs/common';
import { TypeORMError } from 'typeorm/error/TypeORMError';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  /**
   * 유저 정보 조회
   * @param transactionManager
   * @param social_id
   */
  async findBySocialId(
    @TransactionManager() transactionManager: EntityManager,
    id: string,
  ) {
    return await transactionManager.findOne(Users, { where: { id } });
  }
}
