import { HttpException } from './http.exception.js';

export class UnauthorizedException extends HttpException {
  constructor(
    errorMessage = '인증 자격 증명이 유효하지 않습니다.',
    clientMessage = '',
    clientMessageType = 'popup',
  ) {
    super(401, errorMessage, clientMessageType, clientMessage);
  }
}
