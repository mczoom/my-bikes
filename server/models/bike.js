const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');


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
    type: Decimal128 || Number,
    //required: true,
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
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  __v: {
    type: Number,
    select: false,
  }
});


module.exports = mongoose.model('bike', bikeSchema);
