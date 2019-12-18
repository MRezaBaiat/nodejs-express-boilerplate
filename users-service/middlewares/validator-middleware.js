import ValidationError from '../errors/validation-error';
import { validate } from '../helpers';

function ValidatorMiddleware (validator, allowUnknown: boolean = false) {
  return (req, res, next) => {
    const result = validate(req.body, validator, { allowUnknown });
    if (result.error) throw new ValidationError(result.error.message);
    next();
  };
}

export default ValidatorMiddleware;
