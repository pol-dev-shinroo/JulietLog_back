import Joi from 'joi';

export const local_login_validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).unknown(false);
