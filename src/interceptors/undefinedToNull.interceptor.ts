import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
//json에서는 undefined를 인식하지 못하기 때문에 null로 치환
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //전 부분 (시간 초 잴때 사용)
    return next
      .handle()
      .pipe(
        map((data) =>
          data === undefined ? null : { success: true, response: data },
        ),
      );
  }
}
