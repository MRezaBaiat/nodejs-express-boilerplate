import GenericError from "./generic-error";
import {ErrorCodes} from "../constants";

export default class AccessDeniedError extends GenericError{
    constructor(message) {
        super(message,ErrorCodes.FORBIDDEN);
    }
};
