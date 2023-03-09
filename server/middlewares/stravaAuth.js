const StravaToken = require("../models/stravaToken");


module.exports.checkStravaToken = (req, res, next) => {
  const userID = req.user._id;
  let isStrTokenExpired;
  StravaToken.findOne({userID})
    .orFail(new Error('Пользователь не найден'))
    .then((tokenData) => {
      isStrTokenExpired = tokenData.expires_at - Date.now();      
    })
    .catch(next);
  req.isexpired = isStrTokenExpired;
  next();
};
