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
    type: Decimal128,  
    get: getDistanceAsNumber  
  },
  bikeOdoCurrent: {
    type: Decimal128, 
    get: getDistanceAsNumber   
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
    type: Number || Decimal128,
    //type: Decimal128,
    //get: getDistanceAsNumber,
    default: 0,
  },
  retired: {
    type: Boolean,
    default: false,
  }, 
  __v: {
    type: Number,
    select: false,
  }
}, {toJSON: {getters: true}});



module.exports = mongoose.model('part', partSchema);
