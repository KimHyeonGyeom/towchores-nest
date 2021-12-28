import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtags } from '../../entities/Hashtags';

export class HashtagRepository {
  constructor(
    @InjectRepository(Hashtags) private hashtagRepository: Repository<Hashtags>,
  ) {}
}
