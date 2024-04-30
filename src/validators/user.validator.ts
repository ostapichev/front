import Joi from "joi";

const userValidator = Joi.object({
    profile: Joi.object({
        name: Joi.string()
            .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
            .required()
            .messages({
                'string.pattern.base': 'First letter uppercase min 2 max 20 ch',
                'string.required': "This field is required"
            }),
        surname: Joi.string()
            .regex(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
            .required()
            .messages({
                'string.pattern.base': 'First letter uppercase min 2 max 20 ch',
                'string.required': "This field is required"
            }),
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Email must have a domain only "com" and "net"',
            'string.empty': 'Email is required'
        }),
});

export {
    userValidator
};
