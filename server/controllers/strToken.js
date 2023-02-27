const StravaToken = require('../models/stravaToken');

const {STRAVA_AUTH_URL, CLIENT_ID, CLIENT_SECRET, STRAVA_API_URL} = process.env;


module.exports.getAccess = (req, res, next) => {
  return fetch(`http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=profile:read_all,activity:read_all`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
};


module.exports.exchangeStrToken = (req, res, next) => {

  const exchangeToken = req.body.accessToken;

  return fetch(`${STRAVA_AUTH_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${exchangeToken}&grant_type=authorization_code`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.access_token) {
        StravaToken.create({access_token: res.accessToken, expires_at: res.expires_at, refresh_token: res.refresh_token});
      }
    })
    .then((res) => res.status(201).send(res))
    .catch(() => console.log('Ошибка получения Strava токена'));
};


module.exports.refreshStrToken = (req, res, next) => {
  const user = req.user._id;

  StravaToken.find({user})
    .then((tokenData) => res.send(tokenData))
    .catch(next);
};