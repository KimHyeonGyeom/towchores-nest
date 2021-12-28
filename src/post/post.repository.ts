import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';
import { Posts } from '../entities/Posts';
import { Users } from '../entities/Users';

export class PostRepository {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  /**
   * 게시글 생성
   * @param {object} user_id : 유저 아이디
   * @param {object} title : 제목
   * @param {object} content : 내용
   * @param {object} latitude : 위도
   * @param {object} longitude : 경도
   * @param {object} area : 지역
   * @param {EntityManager} transactionManager 트랜잭션
   */
  async createPost(
    user_id,
    title,
    content,
    latitude,
    longitude,
    area,
    @TransactionManager() transactionManager?: EntityManager,
  ) {
    try {
      return await transactionManager.save(Posts, {
        user_id,
        title,
        content,
        latitude,
        longitude,
        area,
      });
    } catch (err: any) {
      throw err;
    }
  }
}