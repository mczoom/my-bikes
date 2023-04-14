const { celebrate, Joi } = require('celebrate');


module.exports.updateBikeInfoValidation = celebrate({
    body: Joi.object().keys({
      weight: Joi.number()      
    }).unknown(true),
  });