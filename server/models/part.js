const mongoose = require('mongoose');


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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bike',    
  },
  bikeName: {
    type: String,
  },
  bikeOdoAtInstal: {
    type: Number,
    default: 0, 
  },
  bikeOdoAtLastUpdate: {
    type: Number,
    default: 0,  
  },
  updated: {
    type: Date, 
    default: new Date().toLocaleString(),
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },  
  model: {
    type: String,
  },
  year: {
    type: String,
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
    set: v => new Number(v.toFixed(1)),
    default: 0,
  },
  created: {
    type: Date, 
    default: new Date().toLocaleString(),
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
