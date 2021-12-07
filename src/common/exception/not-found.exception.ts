import { HttpException } from './http.exception.js';

export class NotFoundException extends HttpException {
  constructor(
    errorMessage = '찾을 수 없습니다.',
    clientMessage = '',
    clientMessageType = 'popup',
  ) {
    super(404, errorMessage, clientMessageType, clientMessage);
  }
}
