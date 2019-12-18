import { ErrorCodes } from '../constants';
import GenericError from './generic-error';

export default class ValidationError extends GenericError {
    model;
    constructor (message, model) {
      super(message, ErrorCodes.BAD_REQUEST);
      this.model = model;
    }
};
