const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const stravaToken = require('../models/stravaToken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { login, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ login, password: hash }))
    .then((user) => res.status(201).send({ login: user.login }))
    .catch((err) => {
      if (err.code === 11000) {
        next(Promise.reject(new Error('Пользователь с таким логином уже зарегистрирован')));
      } else if (err.name === 'ValidationError') {
        next(Promise.reject(new Error('Переданы некорректные данные')));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { login, password } = req.body;
  
  return User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({token});
      return user
    })
    // .then(user => stravaToken.findOne({userID: user._id}).
    //     then((resp) => console.log(resp.access_token)))
    .catch(next);
};
