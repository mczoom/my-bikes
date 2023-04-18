const { celebrate, Joi } = require('celebrate');


module.exports.updateBikeInfoValidation = celebrate({
    body: Joi.object().keys({
      bikeId: Joi.string(),
      updatedInfo: Joi.object().keys({      
        year: Joi.number().integer().allow(''),      
        weight: Joi.number().allow('')      
        }).unknown(true)
      }),
  });