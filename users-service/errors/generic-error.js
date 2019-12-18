import { ErrorCodes } from '../constants';

export default class GenericError {
    message;
    statusCode;
    constructor (message, statusCode = ErrorCodes.INTERNAL_SERVER_ERROR) {
      this.message = message;
      this.statusCode = statusCode;
    }
};
