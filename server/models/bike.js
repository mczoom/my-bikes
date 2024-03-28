const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const { getDistanceAsNumber } = require('../utils/services');


const bikeSchema = new mongoose.Schema({
  id: {
    type: String,
    //required: true,
    //unique: true,
  },
  name: {
    type: String,
    default: '--',
    //required: true,
  },
  brand: {
    type: String,
    default: '--',
  },
  model: {
    type: String,
    default: '--',
  },
  year: {
    type: String,
    default: '--',
  },
  weight: {
    type: String,
    default: '--',
  },
  converted_distance: {
    type: Number, 
    set: v => new Number(v.toFixed(1)),
  },
  retired: {
    type: Boolean,
    default: false,
  },
  photo:{
    type: String,
    default: 'http://localhost:3001/default-bike.jpg',
  },
  trainer: {
    type: Boolean,
    default: false,
  },
  installedParts: {
    type: [String]
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },  
  __v: {
    type: Number,
    select: false,
  }
}, { toJSON: { getters: true }, timestamps: true });


module.exports = mongoose.model('bike', bikeSchema);
