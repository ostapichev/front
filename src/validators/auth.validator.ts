import Joi from 'joi';

const authValidator = Joi.object({
    email: Joi.string()
        .messages({
            'string.pattern.base': 'This field is must be email!',
            'string.required': "This field is required"
    }).required(),
    password: Joi.string()
        .messages({
            'string.pattern.base': 'This field is must be password!',
            'string.required': "This field is required"
    }).required()
});

export {
    authValidator
};
