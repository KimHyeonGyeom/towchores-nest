import { EntityManager, Repository, TransactionManager } from 'typeorm';
import { Users } from '../../entities/Users';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Entity } from 'typeorm-model-generator';

export class UserRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  /**
   * 유저 정보 조회
   * @param {number} id 유저 아이디
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {Users} Users 유저
   */
  async findBySocialId(
    id: number,
    @TransactionManager() transactionManager?: EntityManager,
    Users?,
  ) {
    return await this.repository(transactionManager).findOne(Users, {
      where: { social_id: id },
    });
  }

  /**
   * 유저 정보 조회
   * @param {object} id id : 유저 아이디
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {Users} Users 유저
   */
  async findById(
    id: number,
    @TransactionManager() transactionManager?: EntityManager,
    Users?,
  ) {
    return await this.repository(transactionManager).findOne(Users, {
      select: ['id', 'role', 'nickname', 'profile_image_url', 'device_token'],
      where: {
        id: id,
      },
    });
  }
  /**
   * 유저 레코드 수 조회
   * @param {string} nickname 닉네임
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {Users} Users 유저
   */
  async countByNickName(
    nickname: string,
    @TransactionManager() transactionManager?: EntityManager,
    Users?,
  ) {
    try {
      return await this.repository(transactionManager).count(Users, {
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
        {
          device_token: raw.device_token,
        },
        { social_id: raw.social_id },
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * 유저 프로필 이미지 수정
   * @param {EntityManager} transactionManager 트랜잭션
   * @param {number} id : 유저 아이디
   * @param {string} profile_image_url : 유저 아이디}
   */
  async update(
    @TransactionManager() transactionManager: EntityManager,
    id: number,
    profile_image_url: string,
  ) {
    try {
      return await transactionManager.update(
        Users,
        {
          id: id,
        },
        {
          profile_image_url: profile_image_url,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  repository(transactionManager): any {
    if (transactionManager === undefined) return this.usersRepository;
    else return transactionManager;
  }
}
