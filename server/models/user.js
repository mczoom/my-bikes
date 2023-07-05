const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');


const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  accessToStrava: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
  read_all: {
    type: Boolean,
    default: false,
  },
  activity_read_all: {
    type: Boolean,
    default: false,
  },
  profile_read_all: {
    type: Boolean,
    default: false,
  }
});


userSchema.statics.findUserByCredentials = function (login, password) {
  return this.findOne({ login }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotFoundError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
