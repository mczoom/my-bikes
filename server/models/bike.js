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
    type: Number,
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
  }
});



const gearSchema = new mongoose.Schema({
  bikes: [bikeSchema],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});


module.exports = mongoose.model('bike', gearSchema);
