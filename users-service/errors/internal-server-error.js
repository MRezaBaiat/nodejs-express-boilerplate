import GenericError from "./generic-error";
import {ErrorCodes} from "../constants";

export default class InternalServerError extends GenericError{
    constructor(message) {
        super(message,ErrorCodes.INTERNAL_SERVER_ERROR);
    }
}
