import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { BadRequestException } from '../common/exception/bad-request.exception';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /**
   * 로그인
   */
  async login(id: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // //유저 정보 조회
      throw new BadRequestException('123t', 'tf');
      // throw new Error('123');
      const user = await this.userRepository.findBySocialId(
        queryRunner.manager,
        id,
      );
      //console.log(user);
      //commit
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
      //throw new QueryFailedError(err);
      //throw new BadRequestException('Account with this email already exists.');
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}

//}

//   if (!user) {
//     throw new NotFoundException(__("ERROR_USER_NOT_FOUND_MESSAGE"));
//   }
//
//   //저장된 디바이스 토큰이 다르면 새로운 토큰으로 변경
//   if (user.device_token !== raw.device_token) {
//     await this.userRepository.updateDeviceToken(raw);
//     user = await this.userRepository.findBySocialId({
//       id: raw.social_id,
//       transaction: raw.transaction
//     });
//   }
//
//   //토큰 생성
//   const token = jwt.sign({
//     user_id: user.id,
//   });
//
//
//   return [token, user]
// }
