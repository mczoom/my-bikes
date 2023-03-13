const mongoose = require('mongoose');


const stravaTokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
    //unique: true,
  },
  expires_at: {
    type: Number,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
    // unique: true,
  },
  stravaUserId: {
    type: Number,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});


module.exports = mongoose.model('stravaToken', stravaTokenSchema);