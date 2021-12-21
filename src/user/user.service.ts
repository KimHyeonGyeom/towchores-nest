import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserRepository } from './user.repository';
import { BadRequestException } from '../common/exception/bad-request.exception';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { NotFoundException } from '../common/exception/not-found.exception';

import { InjectRedis, RedisClient } from '@pokeguys/nestjs-redis';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from '../lib/utils';
import { S3 } from 'aws-sdk';
import { Users } from '../entities/Users';

@Injectable()
export class UserService {
  constructor(
    private readonly i18n: I18nRequestScopeService,
    private connection: Connection,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: RedisClient,
  ) {}

  /**
   * 로그인
   */
  async login(raw) {
    let user;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //유저 정보 조회
      user = await this.userRepository.findBySocialId(
        raw.social_id,
        queryRunner.manager,
        Users,
      );
      if (!user) {
        throw new NotFoundException(
          await this.i18n.translate('consts.ERROR_USER_NOT_FOUND_MESSAGE'),
        );
      }

      //저장된 디바이스 토큰이 다르면 새로운 토큰으로 변경
      if (user.device_token !== raw.device_token) {
        await this.userRepository.updateDeviceToken(queryRunner.manager, raw);
        user = await this.userRepository.findBySocialId(
          raw.social_id,
          queryRunner.manager,
        );
      }

      //토큰 생성
      const payload = { user_id: user.id };
      const token = this.jwtService.sign(payload);

      //세션 생성
      this.redis.pipeline().set(raw.social_id, JSON.stringify(user)).exec();

      //commit
      await queryRunner.commitTransaction();
      return [token, user];
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  /**
   * 회원가입
   * @param {object} raw {nickname : 닉네임, social_id : 소셜 아이디, social_type : 소셜 타입, latitude : 위도, longitude : 경도}
   */
  async signUp(raw: any) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    //닉네임 정규식 체크
    if (!/^[가-힣a-zA-Z0-9]{2,10}$/.test(raw.nickname)) {
      throw new BadRequestException(
        await this.i18n.translate('consts.ERROR_USER_NICKNAME_REGEX'),
        await this.i18n.translate('consts.ERROR_USER_NICKNAME_REGEX'),
        await this.i18n.translate('consts.CLIENT_MESSAGE_TOAST_TYPE'),
      );
    }
    try {
      //닉네임 중복 체크
      const hasNickname = await this.userRepository.countByNickName(
        raw.nickname,
        queryRunner.manager,
      );
      if (hasNickname) {
        throw new BadRequestException(
          await this.i18n.translate('consts.ERROR_NICKNAME_NOT_FOUND_MESSAGE'),
        );
      }

      //유저 생성
      const { password, email, deleted_at, user_type, ...user } =
        await this.userRepository.create(queryRunner.manager, {
          role: 'user',
          nickname: raw.nickname,
          social_id: raw.social_id,
          social_type: raw.social_type,
          latitude: raw.latitude,
          longitude: raw.longitude,
        });

      await queryRunner.commitTransaction();

      return user;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  /**
   * 유저 프로필 수정
   * @param {object} raw - {user_id : 유저 아이디, image : 프로필 이미지, transaction : 트랜잭션 }
   */
  async updateUser(raw: any) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //S3 Upload
      const { originalname } = raw.image;
      const bucketS3 = process.env.S3_BUCKET;
      const s3Result: any = await this.uploadS3(
        raw.image.buffer,
        bucketS3,
        originalname,
      );

      //유저 프로필 수정
      if (!isEmpty(raw.image))
        await this.userRepository.update(
          queryRunner.manager,
          raw.user_id,
          s3Result.Location,
        );

      //수정 후 유저 조회 반환
      const user = await this.userRepository.findById(
        queryRunner.manager,
        raw.user_id,
      );
      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
  }
}
