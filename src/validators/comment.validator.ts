import Joi from "joi";

const commentValidator = Joi.object({
    comment: Joi.string()
        .required()
        .messages({
            'string.required': "This field is required"
        })
})

export {
    commentValidator
};
