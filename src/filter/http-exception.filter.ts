import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException } from '../common/exception/http.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.status;
    const error_message = exception.message;
    const client_message = exception.client_message;
    const client_message_type = exception.client_message_type;

    //Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

    response.status(status).json({
      status: status,
      error_message: error_message,
      client_message: client_message,
      client_message_type: client_message_type,
    });
  }
}
