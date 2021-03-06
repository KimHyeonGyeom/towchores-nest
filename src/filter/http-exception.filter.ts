import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '../common/exception/http.exception';
import { isEmpty } from '../lib/utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.status || 500;
    const error_message = exception.message;
    const client_message = exception.client_message;
    const client_message_type = exception.client_message_type;
    const err = exception.response as {
      error: string;
      statusCode: 400;
      message: string[];
    };

    if (isEmpty(err)) {
      response.status(status).json({
        error_message: error_message,
        client_message: client_message,
        client_message_type: client_message_type,
      });
    } else {
      if (typeof err !== 'string' && err.error === 'Bad Request') {
        return response.status(status).json({
          status: status,
          error_message: err.message[0],
          client_message: err.message[0],
          client_message_type: 'popup',
        });
      }
    }
  }
}
