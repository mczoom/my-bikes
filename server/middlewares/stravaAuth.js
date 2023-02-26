const StravaToken = require("../models/stravaToken");

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.checkStravaToken = (req, res, next) => {
  const userID = req.user._id;
  StravaToken.findById(userID)
    .orFail(new Error('Пользователь не найден'))
    .then((user) => {return (user.expires_at - Date.now())})
    .catch(next);

  next();
};
