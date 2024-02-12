const mongoose = require('mongoose');


const partInfoSchema = new mongoose.Schema({
  id: {
    type: String,
    //required: true,    
  },
  bikeId: {
    type: String,    
  },
  category: {
    type: String,
    //required: true,
  },
  brand: {
    type: String,
    default: '',
  },  
  model: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    default: '',
  },
  weight: {
    type: String,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0,
  },
  retired: {
    type: Boolean,
    default: false,
  },
});


const partSchema = new mongoose.Schema({
  part: partInfoSchema,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});


module.exports = mongoose.model('part', partSchema);
