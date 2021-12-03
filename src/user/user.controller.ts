import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UndefinedToNullInterceptor } from '../interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/nhc-login')
  async login(
    @Query('id') social_id: string,
    @Query('device_token') device_token: string,
    @Query('social_type') social_type: string,
  ) {
    //await this.userService.login(social_id);
    // const [token, user] = this.userService.login({
    //   social_id: social_id,
    //   device_token: device_token,
    //   transaction: req.transaction,
    // });
    //
    // //세션 key 저장
    // req.session.key = social_id;
    console.log(social_id);
    return true;
  }
}
