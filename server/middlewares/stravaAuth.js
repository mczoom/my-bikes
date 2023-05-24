const NotFoundError = require("../errors/NotFoundError");
const StravaToken = require("../models/stravaToken");


module.exports.checkStravaToken = async(req, res, next) => {
  const userID = req.user._id;
  let refreshToken;
  
  await StravaToken.findOne({userID})
    .orFail(new NotFoundError('Не найден StravaToken для текущего пользователя'))
    .then((tokenData) => {
      //if(tokenData) {
        const isStrTokenExpired = tokenData.expires_at - Date.now();
        if(isStrTokenExpired < 0) {
          refreshToken = tokenData.refresh_token;
        };
      //};
    })
    .catch(next);

  if(refreshToken) {
    req.refreshToken = refreshToken;
  }
  next();
};
