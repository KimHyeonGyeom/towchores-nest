import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { PostRepository } from './post.repository';
import { ImageRepository } from '../image/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostService, PostRepository, ImageRepository],
  controllers: [PostController],
})
export class PostModule {}
