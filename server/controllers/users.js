const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RegistrationError = require('../errors/RegistrationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { login, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ login, password: hash }))
    .then((user) => res.status(201).send({ login: user.login }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegistrationError ('Пользователь с таким логином уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new RegistrationError('Переданы некорректные данные'));
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
    .catch(next);
};


// module.exports.addStravaPermissions = async (req, res, next) => {
//   const userID = req.user._id;
//   const {scope} = req.body;
//   const user = await User.findOne({_id: userID})
//   try{
//     if (!scope) {
//       throw new RegistrationError('Необходимо разрешить приложению доступ к аккаунту Strava')
//     } else {       
//       user.accessToStrava = true;
//       user.read = true;
//       user.activity_read_all = true;
//       user.profile_read_all = true;
//       user.read_all = true;    

//       await user.save();
//       res.send(user.accessToStrava);  
//     }    
//   } catch (err) {
//     next(err);
//   };
// }


module.exports.checkStravaPermissions = async (req, res, next) => {
  const userID = req.user._id;  
  User.findOne({_id: userID})
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then(async (user) => {
      res.send(user.accessToStrava);  
    })
    .catch(next);
}


module.exports.addStravaPermissions = async (req, res, next) => {
  const userID = req.user._id;
  const {scope} = req.body;
  User.findOne({_id: userID})
    .then(async (user) => {
      if (!scope) {
        throw new RegistrationError('Необходимо разрешить приложению доступ к аккаунту Strava')
      } else {       
        user.accessToStrava = true;
        user.read = true;
        user.activity_read_all = true;
        user.profile_read_all = true;
        user.read_all = true;    
  
        await user.save();
        res.send(user.accessToStrava);  
      }    
    })
    .catch(next);
}



module.exports.getUser = (req, res, next) => {
  const userID = req.user._id;
    
  User.findOne({_id: userID})
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send({login: user.login});      
    })
    .catch(next);
};

