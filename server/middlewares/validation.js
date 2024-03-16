const { celebrate, Joi } = require('celebrate');


module.exports.updateBikeInfoValidation = celebrate({
    body: Joi.object().keys({
      bikeId: Joi.string(),
      updatedInfo: Joi.object().keys({ 
        photo: Joi.string(),
        bikename: Joi.string(),
        brand: Joi.string(),
        model: Joi.string(),
        year: Joi.number().integer().allow(''),      
        weight: Joi.number().allow(''),      
        trainer: Joi.boolean(),      
        }).unknown(true)
      }),
  });


module.exports.updatePartInfoValidation = celebrate({
    body: Joi.object().keys({
      partId: Joi.string(),
      updatedInfo: Joi.object().keys({ 
        id: Joi.string(), 
        category: Joi.string(), 
        brand: Joi.string().allow(''),
        model: Joi.string().allow(''),
        price: Joi.number().integer().allow(''),      
        weight: Joi.number().allow(''),
        bikeSelect: Joi.string(),      
        bikeOdo: Joi.number().allow(''),
        uninstalled: Joi.boolean(),
        }).unknown(true)
      }),
  });