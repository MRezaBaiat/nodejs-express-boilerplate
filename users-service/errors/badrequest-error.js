import GenericError from "./generic-error";
import {ErrorCodes} from "../constants";

export default class BadRequestError extends GenericError{
    constructor(message) {
        super(message,ErrorCodes.BAD_REQUEST);
    }
}
