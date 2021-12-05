import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';

//import { constraintErrors } from './constraint-errors';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
  constructor(public reflector: Reflector) {}

  catch(
    exception: QueryFailedError & { constraint?: string },
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.constraint?.startsWith('UQ')
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: status,
      error_message: '데이터베이스 오류가 발생하였습니다.',
      client_message:
        '서버에서 응답에러가 발생 하였습니다. \r 앱 종료 후 다시 접속해 주세요.',
      client_message_type: 'popup',
    });
  }
}
