import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'mysql2/promise';
@Injectable()
export class UserService {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  /**
   * 로그인
   */
  login(social_id: string): any {
    //유저 정보 조회
    // this.userRepository.findBySocialId({
    //   id: raw.social_id,
    //   transaction: raw.transaction,
    // });
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
  }
}
