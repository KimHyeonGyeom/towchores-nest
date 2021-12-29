import { Injectable } from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { Connection } from 'typeorm';
import { PostRepository } from './post.repository';
import { isEmpty, uploadS3 } from '../../lib/utils';
import { ImageRepository } from '../image/image.repository';
import { Images } from '../../entities/Images';
import { HashtagRepository } from '../hashtag/hashtag.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly i18n: I18nRequestScopeService,
    private connection: Connection,
    private postRepository: PostRepository,
    private imageRepository: ImageRepository,
    private hashtagRepository: HashtagRepository,
  ) {}

  /**
   * 게시글 등록 (해시 태그, 이미지)
   * @param {object} raw - {user_id : 유저 아이디, title : 제목, content : 내용, latitude : 위도, longitude : 경도, area : 지역, file : 이미지, hashtags : 해시태그, transaction : 트랜잭션}
   */
  async addPost(raw: any) {
    const imageList = [];
    const hashtagList = [];

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //게시글 DB 저장
      const post = await this.postRepository.createPost(
        raw.user_id,
        raw.title,
        raw.content,
        raw.latitude,
        raw.longitude,
        raw.area,
        queryRunner.manager,
      );

      // //게시글 이미지 DB 저장
      if (!isEmpty(raw.images)) {
        for (const image of raw.images) {
          //S3 Upload
          const bucketS3 = process.env.S3_BUCKET;
          const s3Result: any = await uploadS3(image.buffer, bucketS3, image);
          //해시태그 배열에 저장
          imageList.push({
            postId: post.id,
            userId: raw.user_id,
            imageNameUrl: s3Result.Location,
          });
        }
        await this.imageRepository.bulkCreate(imageList, queryRunner.manager);
      }

      //해시태그 DB 저장
      if (!isEmpty(raw.hashtags)) {
        if (raw.hashtags.type === 'array') {
          for (const hashtag of raw.hashtags) {
            //이미지 배열에 저장
            hashtagList.push({
              post_id: post.id,
              keyword: hashtag,
            });
          }
        } else {
          hashtagList.push({
            postId: post.id,
            keyword: raw.hashtags,
          });
        }
        await this.hashtagRepository.bulkCreate(
          hashtagList,
          queryRunner.manager,
        );
      }

      await queryRunner.commitTransaction();
      return post;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    //   await this.imageRepository.bulkCreateImages({
    //     imageList: imageList,
    //     transaction: raw.transaction,
    //   });
    // }
    //
    // //해시태그 저장
    // if (!isEmpty(raw.hashtags)) {
    //   for (const keyword of raw.hashtags) {
    //     hashtagList.push({
    //       post_id: post.id,
    //       keyword: keyword,
    //     });
    //   }
    //   await this.hashtagRepository.bulkCreateHashtags({
    //     hashtagList: hashtagList,
    //     transaction: raw.transaction,
    //   });
    // }
  }
}
