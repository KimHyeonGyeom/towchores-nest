import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from '../lib/utils';
import { UnauthorizedException } from '../common/exception/unauthorized.exception';
import { ForbiddenException } from '../common/exception/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis, RedisClient } from '@pokeguys/nestjs-redis';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: RedisClient,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles !== undefined && roles[0] === 'pass') {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const bearerToken = req.headers['authorization'];
    //TODO redis 세션 가져오는 방법 고민좀 필요...
    // if (isEmpty(req.session.key)) {
    //   throw new UnauthorizedException(
    //     '세션이 없습니다. 로그인을 진행해주세요.',
    //     '',
    //   );
    // }

    if (bearerToken) {
      try {
        const token = bearerToken.replace(/^Bearer /, '');
        const decoded: any = this.jwtService.verify(token);

        // if (decoded.social_id !== req.session.key) {
        //   throw new ForbiddenException(
        //     '인증 정보와 세션 정보가 다릅니다. (403)',
        //   );
        // }

        req.token_user_id = decoded.user_id;
      } catch (err: any) {
        if (err.name === 'TokenExpiredError')
          throw new UnauthorizedException('토큰만료');

        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException('인증이 필요합니다.');
    }
    return true;
  }
}
