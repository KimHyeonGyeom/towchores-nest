import { HttpException } from './http.exception.js';

export class ForbiddenException extends HttpException {
  constructor(
    errorMessage = '접근 권한이 없습니다.',
    clientMessage = '',
    clientMessageType = 'popup',
  ) {
    super(403, errorMessage, clientMessageType, clientMessage);
  }
}
