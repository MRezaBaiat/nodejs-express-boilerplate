import GenericError from "./generic-error";
import {ErrorCodes} from "../constants";

export default class NotFoundError extends GenericError{
        constructor(message) {
            super(message,ErrorCodes.NOT_FOUND);
        }
}
