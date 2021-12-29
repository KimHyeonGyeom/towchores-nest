import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, TransactionManager } from 'typeorm';
import { Hashtags } from '../../entities/Hashtags';

export class HashtagRepository {
  constructor(
    @InjectRepository(Hashtags) private hashtagRepository: Repository<Hashtags>,
  ) {}

  async bulkCreate(
    hashtagList: any,
    @TransactionManager() transactionManager?: EntityManager,
  ) {
    try {
      return await transactionManager
        .createQueryBuilder()
        .insert()
        .into(Hashtags)
        .values(hashtagList)
        .execute();
    } catch (err: any) {
      throw err;
    }
  }
}
