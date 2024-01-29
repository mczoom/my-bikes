const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Нет доступа: необходимо залогиниться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
  } catch (err) {    
    throw new AuthorizationError('Нет доступа: неправильный токен приложения');
  }
  req.user = payload;
  next();
};
