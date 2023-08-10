import Joi from 'joi';

export const create_user_validation = Joi.object({
    nickname: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().required(),
}).unknown(false);
