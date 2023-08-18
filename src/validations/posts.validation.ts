import Joi from 'joi';

export const post_create_validation = Joi.object({
    userId: Joi.number().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().required(),
}).unknown(false);
