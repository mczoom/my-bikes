const mongoose = require('mongoose');


const bikeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  distance: {
    type: Number,
    required: true,
  },
  retired: {
    type: Boolean,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});


module.exports = mongoose.model('bike', bikeSchema);
