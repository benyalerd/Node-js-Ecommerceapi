const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': `Please enter your name.`,
            'string.empty': `Please enter your name.`,
            'any.required': `Please enter your name`
          }),
    lastname: Joi.string()
        .required()
        .messages({
            'string.base': `Please enter your lastname.`,
            'string.empty': `Please enter your lastname.`,
            'any.required': `Please enter your lastname`
          }),
    password: Joi.string()
    .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,20}$'))
        .messages({
            'string.base': `Please enter your password.`,
            'string.empty': `Please enter your password.`,
            'any.required': `Please enter your password.`,
            'string.pattern': `password must be number or alphabet between 8 to 20 characters.`,
          }),
    repeat_password: Joi.string()
    .equal(Joi.ref('password'))
    .messages({'any.only': 'password does not match' }),
    email: Joi.string()
    .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.base': `Please enter your email.`,
            'string.empty': `Please enter your email.`,
            'any.required': `Please enter your email`,
            'string.pattern': `email is incorrect.`,
          }),
    role: Joi.number()
        .required()
        .messages({
            'string.base': `Please select your role.`,
            'string.empty': `Please select your role.`,
            'any.required': `Please enter your role`,
          }),
    tel:Joi.string()
    .required()
    .pattern(new RegExp(/((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))/))
    .messages({
        'string.base': `Please select your Tel.`,
        'string.empty': `Please select your Tel.`,
        'any.required': `Please enter your Tel`,
        'string.pattern': `Tel is incorrect.`,
      })
});

RegisterValidation = function (body){
    try {
        const error = registerSchema.validate(body);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

module.exports.RegisterValidation = RegisterValidation;

