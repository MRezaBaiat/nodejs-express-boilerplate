import * as Logger from './Logger';
import * as asyncWrapper from './AsyncWrapper';
import * as Hasher from './Hasher';
import joi from 'joi';
import ValidationError from "../errors/validation-error";


export {
    Logger,
    asyncWrapper,
    Hasher
}


export function validate(object,validator,opts: {allowUnknown:boolean} = {allowUnknown:false}) {
    return joi.validate(object || null,validator,opts);
}

export function validateOrThrow(object,validator,opts: {allowUnknown:boolean} = {allowUnknown:false}) {
    const result = validate(object,validator,opts);
    if(result.error) throw new ValidationError(result.error.message);
}
