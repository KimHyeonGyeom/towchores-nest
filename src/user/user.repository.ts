import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { Users } from '../entities/Users';
import { Injectable } from '@nestjs/common';

@EntityRepository()
export class UserRepository {
  constructor(private manager: EntityManager) {}
  /**
   * 유저 정보 조회
   * @param {object} raw {id : 소셜 아이디, transaction : 트랜잭션}
   */
  async findBySocialId(social_id: string) {
    try {
      // return this.manager.findOne({ where: { social_id } });
    } catch (err) {
      //throw new DatabaseException(err);
    }
  }
}
