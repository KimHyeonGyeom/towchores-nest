export class HttpException extends Error {
  status: number;
  client_message_type: string;
  client_message: string;
  response: any;
  constructor(status, errorMessage, clientMessage, clientMessageType) {
    super();
    this.status = status;
    this.message = errorMessage;
    this.client_message = clientMessage;
    this.client_message_type = clientMessageType;
  }
}
