import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

export class ImageRepository {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}

  async bulkCreate(
    imageList: any,
    @TransactionManager() transactionManager?: EntityManager,
  ) {
    try {
      return await transactionManager.save(imageList);
    } catch (err: any) {
      throw err;
    }
  }
}
