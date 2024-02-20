const mongoose = require('mongoose');


const partInfoSchema = new mongoose.Schema({
  id: {
    type: String,   
  },
  bikeId: {
    type: String,    
  },
  bikeOdoAtInstal: {
    type: Number,    
  },
  bikeOdoCurrent: {
    type: Number,    
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
    default: 0,
  },
  retired: {
    type: Boolean,
    default: false,
  },
});



const partSchema = new mongoose.Schema({
  parts: { 
    chainrings: [partInfoSchema],    
    bbs: [partInfoSchema],       
    cassettes: [partInfoSchema],
    wheels: [partInfoSchema],
    pedals: [partInfoSchema],
    tires: [partInfoSchema],
    frames: [partInfoSchema],
    saddles: [partInfoSchema],
    brakepads: [partInfoSchema],
    cables: [partInfoSchema],
    chains: [partInfoSchema],     
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }

});


module.exports = mongoose.model('part', partSchema);
