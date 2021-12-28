import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../entities/Posts';
import { EntityManager, Repository, TransactionManager } from 'typeorm';
import { Images } from '../../entities/Images';

export class ImageRepository {
  constructor(
    @InjectRepository(Images) private imageRepository: Repository<Images>,
  ) {}

  async bulkCreate(
    imageList: any,
    @TransactionManager() transactionManager?: EntityManager,
  ) {
    try {
      return await transactionManager
        .createQueryBuilder()
        .insert()
        .into(Images)
        .values(imageList)
        .execute();
    } catch (err: any) {
      throw err;
    }
  }
}
