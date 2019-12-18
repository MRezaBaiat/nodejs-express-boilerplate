const joi = require('joi');
const customJoi = joi.extend(require('joi-phone-number'));

const db_insert = joi.object().keys({
    name: joi.string().alphanum().min(3).max(100).required(),
    family:joi.string().alphanum().min(3).max(100).required(),
    password:joi.string().required(),
    two_factor_auth: joi.string(),
    phone:customJoi.string().phoneNumber({ defaultCountry: 'IR', format: 'international',strict: true }),
    email:joi.string().email(),
    coupon:joi.number().min(0).max(100).allow(null).disallow(50),
    creditCard:joi.string().creditCard()
});

const db_update = joi.object().keys({
    name: joi.string().alphanum().min(3).max(100).required(),
    family:joi.string().alphanum().min(3).max(100).required(),
    password:joi.string().required(),
    two_factor_auth: joi.string(),
    phone:customJoi.string().phoneNumber({ defaultCountry: 'IR', format: 'international',strict: true }),
    email:joi.string().email(),
    userId:joi.string().required(),
    coupon:joi.number().min(0).max(100).allow(null).disallow(50),
    creditCard:joi.string().creditCard()
});

const signup = joi.object().keys({
    name: joi.string().alphanum().min(3).max(100).required(),
    family:joi.string().alphanum().min(3).max(100).required(),
    phone:customJoi.string().phoneNumber({ defaultCountry: 'IR', format: 'international',strict: true }),
    email:joi.string().email(),
    password:joi.string().required(),
    coupon:joi.number().min(0).max(100).allow(null).disallow(50),
    creditCard:joi.string().creditCard()
});

const signin = joi.object().keys({
    email:joi.string().email(),
    password:joi.string().required(),
});

const update = joi.object().keys({
    name: joi.string().alphanum().min(3).max(100).required(),
    family:joi.string().alphanum().min(3).max(100).required(),
    phone:customJoi.string().phoneNumber({ defaultCountry: 'IR', format: 'international',strict: true }),
    email:joi.string().email(),
    password:joi.string().required(),
    coupon:joi.number().min(0).max(100).allow(null).disallow(50),
    creditCard:joi.string().creditCard()
});


export default {
    db_insert,
    db_update,
    transfer_private:db_insert,
    transfer_public:db_insert,
    update,
    signin,
    signup
};
