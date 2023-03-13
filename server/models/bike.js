const mongoose = require('mongoose');


const bikeSchema = new mongoose.Schema({
  id: {
    type: String,
    //required: true,
    //unique: true,
  },
  name: {
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
    type: Number,
  },
  weight: {
    type: Number,
  },
  converted_distance: {
    type: Number,
    //required: true,
  },
  retired: {
    type: Boolean,
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
