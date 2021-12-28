import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtags } from '../../entities/Hashtags';
import { HashtagRepository } from './hashtag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtags])],
  providers: [HashtagService, HashtagRepository],
  controllers: [HashtagController],
})
export class HashtagModule {}
