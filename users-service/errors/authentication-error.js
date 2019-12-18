import GenericError from './generic-error';
import { ErrorCodes } from '../constants';

export default class AuthenticationError extends GenericError {
  constructor (message) {
    super(message, ErrorCodes.UNAUTHORIZED);
  }
}
