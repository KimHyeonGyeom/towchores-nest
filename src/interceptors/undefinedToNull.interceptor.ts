import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //json에서는 undefined를 인식하지 못하기 때문에 null로 치환
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
