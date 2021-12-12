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

export class UserRepository {
  /**
   * 유저 정보 조회
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {number} id 유저 아이디
   */
  async findBySocialId(
    @TransactionManager() transactionManager: EntityManager,
    id: number,
  ) {
    return await transactionManager.findOne(Users, {
      where: { social_id: id },
    });
  }

  /**
   * 유저 레코드 수 조회
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {string} nickname 닉네임
   */
  async countByNickName(
    @TransactionManager() transactionManager: EntityManager,
    nickname: string,
  ) {
    try {
      return await transactionManager.count(Users, {
        where: {
          nickname,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * 유저 생성
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {object} raw {role : 역할, nicnkname : 닉네임, social_id : 소셜 아이디, social_type : 소셜 타입, latitude : 위도, longitude : 경도 }
   */
  async create(
    @TransactionManager() transactionManager: EntityManager,
    raw,
  ): Promise<Users> {
    try {
      return await transactionManager.save(Users, {
        role: raw.role,
        nickname: raw.nickname,
        social_id: raw.social_id,
        social_type: raw.social_type,
        latitude: raw.latitude,
        longitude: raw.longitude,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * 유저 디바이스 토큰 수정
   * @param {EntityManager} transactionManager 트랜잭션
   */
  async updateDeviceToken(
    @TransactionManager() transactionManager: EntityManager,
    raw,
  ) {
    try {
      return await transactionManager.update(
        Users,
        { social_id: raw.social_id },
        {
          device_token: raw.device_token,
        },
      );
    } catch (err) {
      throw err;
    }
  }
}
