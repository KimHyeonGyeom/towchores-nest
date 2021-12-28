import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../../entities/Posts';
import { PostRepository } from './post.repository';
import { ImageRepository } from '../image/image.repository';
import { Images } from '../../entities/Images';
import { ImageModule } from '../image/image.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { HashtagRepository } from '../hashtag/hashtag.repository';
import { Hashtags } from '../../entities/Hashtags';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Images, Hashtags]),
    ImageModule,
    HashtagModule,
  ],
  providers: [PostService, PostRepository, ImageRepository, HashtagRepository],
  controllers: [PostController],
})
export class PostModule {}
