import { Repository, EntityRepository } from 'typeorm';
import { Users } from '../entities/Users';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  /**
   * 유저 정보 조회
   * @param {object} raw {id : 소셜 아이디, transaction : 트랜잭션}
   */
  async findBySocialId(raw) {
    try {
      return await this.findOne({
        where: {
          social_id: raw.id,
        },
        transaction: raw.transaction,
      });
    } catch (err) {
      //throw new DatabaseException(err);
    }
  }
}
