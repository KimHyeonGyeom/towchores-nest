import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';
import { Users } from '../entities/Users';
@Injectable()
export class UserService {
  constructor(
    private connection: Connection, //@InjectRepository(UserRepository) //private userRepository: UserRepository,
  ) {}

  /**
   * 로그인
   */
  async login(id: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { id } });
    console.log(user);
    try {
      //유저 정보 조회
      //commit
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}

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
