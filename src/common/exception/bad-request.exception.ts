import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(
    errorMessage = '잘못된 요청입니다.',
    clientMessage = '',
    client_message_type = 'popup',
  ) {
    super(400, errorMessage, clientMessage, client_message_type);
  }
}
