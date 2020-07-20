const Joi = require('@hapi/joi');

module.exports.userschema = Joi.object().keys({

    // email is required
    // email must be a valid email string
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string().regex(/^((09|03|07|08|05)|(9|3|7|8|5))[0-9]{8}$/).required(),
    birthday: Joi.date().max('1-1-2004').iso(),
    age: Joi.number().integer().greater(10),
    sex: Joi.string().valid('M', 'F', 'MALE', 'FEMALE').uppercase().required(),
    name: Joi.string(),
    avatar: Joi.string(),
    password: Joi.string().min(7).alphanum().required()
    //sex: Joi.any().valid('M', 'F', 'MALE', 'FEMALE').required(),

});

module.exports.password = Joi.object().keys({
    
    password: Joi.string().min(7).alphanum().required(),
    //password: Joi.string().min(7).regex(/[A-Z]{1,}[0-9]{1,}[a-zA-Z0-9]{5,}$/).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});

module.exports.querySchema = Joi.object().keys({
    name: Joi.string().required()
});