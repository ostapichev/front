import Joi from "joi";

const searchValidator = Joi.object({
    surnameUserInput: Joi.string().required()
})

export {
    searchValidator
};
