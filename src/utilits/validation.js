import Joi from 'joi'


export const MasterclassSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(new RegExp('((jpeg|png|gif|bmp|svg))')),
    type:Joi.string().required(),
    date: Joi.required(),
    time : Joi.required(),
    internal_direction:Joi.required(),
    adress: Joi.required(),
    phone_number: Joi.string().required(),
    email: Joi.string().email().required(),
    website: Joi.string().required(),
    direction:Joi.string().required()
})
