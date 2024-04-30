import Joi from "joi";

const groupValidator = Joi.object({
    name: Joi.string()
        .regex(/^[a-z]{3}-\d{4}$/)
        .required()
        .messages({
            'string.pattern.base': 'Only special format group. For example: dec-2023',
            'string.required': "This field is required"
        })
})

export {
    groupValidator
};
