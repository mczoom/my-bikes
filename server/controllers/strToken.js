const fetch = require('node-fetch');
const StravaToken = require('../models/stravaToken');

const {STRAVA_AUTH_URL, CLIENT_ID, CLIENT_SECRET, STRAVA_API_URL} = process.env;


module.exports.exchangeStrToken = (req, res, next) => {
  const exchangeToken = req.body.token;
  const user = req.user._id;

  return fetch(`${STRAVA_AUTH_URL}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: exchangeToken,
        grant_type: 'authorization_code'
      })
    })
    .then(res => res.json())
    .then((tokenData) => {          
      if (tokenData.access_token) {
        StravaToken.create({access_token: tokenData.access_token, refresh_token: tokenData.refresh_token, expires_at: tokenData.expires_at, stravaUserId: tokenData.athlete.id, userID: user});
        res.status(201).send({strToken: tokenData.access_token});        
      }
    }) 
    .catch(next);
};


module.exports.refreshStrToken = (req, res, next) => {
  const id = req.user._id;
  const refreshToken = req.refreshToken;
    
  if(refreshToken) {
    return fetch(`${STRAVA_AUTH_URL}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    })
    .then(res => res.json())
    .then(async (tokenData) => {
      if (tokenData.access_token) {
        const update = await StravaToken.findOne({id});
        update.access_token = tokenData.access_token;
        update.expires_at = tokenData.expires_at;
        update.refresh_token = tokenData.refresh_token;
        update.save();
      }
      return tokenData;
    })
    .then((data) => res.send({accessToken: data.access_token}))
    .catch(next);
  };  
};


// module.exports.getStrTokenExpTime = (req, res, next) => {
//   // const stravaUserId = req.body.id;
//   const userID = req.user._id;
  
   
//   StravaToken.findOne({userID})
//     .then((tokenData) => {
//       if(tokenData) {
//         console.log(tokenData); 
//         res.send({expTime: tokenData.expires_at})
//       }
//     })      
//     .catch(next);
// };


