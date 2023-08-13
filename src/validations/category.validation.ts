import Joi from 'joi';

export const create_category_validation = Joi.object({
    category: Joi.string().required(),
}).unknown(false);

export const delete_category_validation = Joi.object({
    category: Joi.string().required(),
}).unknown(false);
