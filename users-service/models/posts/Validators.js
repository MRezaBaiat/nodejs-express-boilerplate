const joi = require('joi');

const db = joi.object().keys({
    _id:joi.number().positive().required(),
    title: joi.string().min(3).max(100).required(),
    senderId: joi.string().required(),
    details:joi.string().min(3).max(100).required(),
    image_url:joi.string(),
    comments: joi.array().items(joi.object({
        senderId:joi.number().positive().required(),
        text:joi.string().required().min(3)
    }))
});

const create = joi.object().keys({
    title: joi.string().min(3).max(100).required(),
    details:joi.string().min(3).max(100).required(),
    image_url:joi.string(),
    comments: joi.array().items(joi.object({
        senderId:joi.number().positive().required(),
        text:joi.string().required().min(3)
    }))
});

export default {
    db,
    create,
    update:db,
}
