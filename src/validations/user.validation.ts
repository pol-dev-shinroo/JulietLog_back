import Joi from 'joi';

export const create_user_validation = Joi.object({
    name: Joi.string().required(),

    email: Joi.string().email().required(),
}).unknown(false);
