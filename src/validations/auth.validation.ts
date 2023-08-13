import Joi from 'joi';

export const local_login_validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).unknown(false);

export const google_login_validation = Joi.object({
    code: Joi.string().required(),
}).unknown(false);
