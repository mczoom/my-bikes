const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema({
  achievement_count: {
    type: Number,
  },
  athlete: {
    id: {
      type: Number,
    },
    resource_state: {
      type: Number,
    },    
  },
  average_cadence: {
    type: Number,
  },
  average_heartrate: {
    type: Number,
  },
  average_speed: {
    type: Number,
  },
  average_temp: {
    type: Number,
  },
  average_watts: {
    type: Number,
  },
  comment_count: {
    type: Number,
  },
  commute: {
    type: Boolean,
  },
  device_watts: {
    type: Boolean,
  },
  distance: {
    type: Number,
  },
  elapsed_time: {
    type: Number,
  },
  gear_id: {
    type: String,
  },
  has_heartrate: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
  kudos_count: {
    type: Number,
  },
  max_heartrate: {
    type: Number,
  },
  max_speed: {
    type: Number,
  },
  max_watts: {
    type: Number,
  },
  moving_time: {
    type: Number,
  },
  name: {
    type: String,
  },
  photo_count: {
    type: Number,
  },
  private: {
    type: Boolean,
  },
  sport_type: {
    type: String,
  },
  start_date_local: {
    type: String,
  },
  total_elevation_gain: {
    type: Number,
  },
  total_photo_count: {
    type: Number,
  },
  trainer: {
    type: Boolean,
  },
  type: {
    type: String,
  },
  visibility: {
    type: String,
  },
  weighted_average_watts: {
    type: Number,
  },
  workout_type: {
    type: Number,
  },
});


const activitiesSchema = new mongoose.Schema({
  activities: [activitySchema],
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});


module.exports = mongoose.model('activity', activitiesSchema);
