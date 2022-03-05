const Joi = require('joi');

const options = {
    allowUnknown: true
  };

const merchantSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'string.base': `Please enter your name.`,
            'string.empty': `Please enter your name.`,
            'any.required': `Please enter your name`,
            
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
    .pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'))
        .messages({
            'string.base': `Please enter your email.`,
            'string.empty': `Please enter your email.`,
            'any.required': `Please enter your email`,
            'string.pattern': `email is incorrect.`
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
    .pattern(new RegExp('^((\\+66|0)(\\d{1,2}\\-?\\d{3}\\-?\\d{3,4}))$'))
    .messages({
        'string.base': `Please select your Tel.`,
        'string.empty': `Please select your Tel.`,
        'any.required': `Please enter your Tel`,
        'string.pattern': `Tel is incorrect.`,
      })
});

merchantValidation = function (body){
    try {
        const error = merchantSchema.validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

  const shopSchema = Joi.object({
    shopName: Joi.string()
        .required()
        .messages({
            'string.base': `Please enter your shop name.`,
            'string.empty': `Please enter your shop name.`,
            'any.required': `Please enter your shop name.`
          }),
          merchantId: Joi.string()
          .required()
          .messages({
              'string.base': `merchant Id is required.`,
              'string.empty': `merchant Id is required.`,
              'any.required': `merchant Id is required.`
            }),

});


ShopValidation = function (body){
    try {
        const error = shopSchema.validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

  emailValidation = function(body){
    try {
        const error = Joi.object({
            email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.email': `email is incorrect.`,
          })
                }).validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

  telValidation = function(body){
    try {
        const error = Joi.object({
            tel:Joi.string()
            .pattern(new RegExp(/((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))/))
            .messages({
                'string.pattern': `Tel is incorrect.`,
              })
                }).validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

  const paymentSchema = Joi.object({
    shopId: Joi.string()
        .required()
        .messages({
            'string.base': `shop Id is required.`,
            'string.empty': `shop Id is required.`,
            'any.required': `shop Id is required.`
          }),
          masterId: Joi.string()
          .required()
          .messages({
              'string.base': `master Id is required.`,
              'string.empty': `master Id is required.`,
              'any.required': `master Id is required.`
            }),
              accountName: Joi.string()
          .required()
          .messages({
              'string.base': `Please enter account name.`,
              'string.empty': `Please enter account name.`,
              'any.required': `Please enter account name.`
            }),
              accountNumber: Joi.string()
          .required()
          .pattern(new RegExp('^[0-9]{10,12}$'))
          .messages({
              'string.base': `Please enter account number.`,
              'string.empty': `Please enter account number.`,
              'any.required': `Please enter account number.`,
              'string.pattern': `account number is incorrect.`
            })

});


paymentValidation = function (body){
    try {
        const error = paymentSchema.validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

  
  const shippingSchema = Joi.object({
    shopId: Joi.string()
        .required()
        .messages({
            'string.base': `shop Id is required.`,
            'string.empty': `shop Id is required.`,
            'any.required': `shop Id is required.`
          }),
          masterId: Joi.string()
          .required()
          .messages({
              'string.base': `master Id is required.`,
              'string.empty': `master Id is required.`,
              'any.required': `master Id is required.`
            }),
              price: Joi.string()
          .required()
          .messages({
              'string.base': `Please enter price.`,
              'string.empty': `Please enter price.`,
              'any.required': `Please enter price.`
            }),
              minDay: Joi.string()
          .required()
          .messages({
              'string.base': `Please enter minDay.`,
              'string.empty': `Please enter minDay.`,
              'any.required': `Please enter minDay.`,
            }),
             maxDay: Joi.string()
          .required()
          .messages({
              'string.base': `Please enter maxDay.`,
              'string.empty': `Please enter maxDay.`,
              'any.required': `Please enter maxDay.`,
            })


});


shippingValidation = function (body){
    try {
        const error = shippingSchema.validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

   accountNumberValidation = function(body){
    try {
        const error = Joi.object({
            accountNumber:Joi.string()
            .pattern(new RegExp('^[0-9]{10,12}$'))
            .messages({
                'string.pattern': `account number is incorrect.`,
              })
                }).validate(body,options);
        return error;

    }
    catch (err) {
        throw err;
     }
  }

module.exports.shippingValidation = shippingValidation;
module.exports.accountNumberValidation = accountNumberValidation;
module.exports.paymentValidation = paymentValidation;
module.exports.merchantValidation = merchantValidation;
module.exports.ShopValidation = ShopValidation;
module.exports.telValidation = telValidation;
module.exports.emailValidation = emailValidation;


