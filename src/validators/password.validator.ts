import Joi from "joi";

const passwordValidator = Joi.object({
    password: Joi.string()
        .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/)
        .required()
        .messages({
            'string.pattern.base': '' +
                'The password must be from 8 to 20 characters consisting ' +
                'of small and large letters, numbers and special characters.',
            'string.required': "This field is required"
        }),
    confirmPassword: Joi.string()
        .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/)
        .required()
        .messages({
            'string.pattern.base': '' +
                'The password must be from 8 to 20 characters consisting ' +
                'of small and large letters, numbers and special characters.',
            'string.required': "This field is required"
        })
})

export {
    passwordValidator
};
