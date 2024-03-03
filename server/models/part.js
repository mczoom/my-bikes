const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const { getDistanceAsNumber } = require('../utils/services');


const partSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: String,   
  },
  bikeSelect: {
    type: String,    
  },
  bikeOdoAtInstal: {
    type: Number,
    default: 0,  
    //get: getDistanceAsNumber,
    //set: v => new Number(v.toFixed(1)),  
  },
  bikeOdoAtLastUpdate: {
    type: Number,
    default: 0,  
    //get: getDistanceAsNumber,
    //set: v => new Number(v.toFixed(1)),  
  },
  category: {
    type: String,
    //required: true,
  },
  brand: {
    type: String,
  },  
  model: {
    type: String,
  },
  year: {
    type: String,
    default: '',
  },
  weight: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    //get: getDistanceAsNumber,
    set: v => new Number(v.toFixed(1)),
    default: 0,
  },
  installed: {
    type: Boolean,
    default: false,
  }, 
  retired: {
    type: Boolean,
    default: false,
  }, 
  __v: {
    type: Number,
    select: false,
  }
}, { toJSON: { getters: true } });



module.exports = mongoose.model('part', partSchema);
