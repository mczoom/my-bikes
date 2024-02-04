const StravaToken = require("../models/stravaToken");

module.exports.createStravaToken = (tokenInfo, userId) => {    
    StravaToken.create({
      access_token: tokenInfo.access_token, 
      refresh_token: tokenInfo.refresh_token, 
      expires_at: tokenInfo.expires_at, 
      stravaUserId: tokenInfo.athlete.id, 
      userID: userId
    });    
};


module.exports.updateStravaToken = async (tokenInfo, id) => {   
  const tokenDoc = await StravaToken.findOne({userID: id});
  
  tokenDoc.access_token = tokenInfo.access_token;
  tokenDoc.expires_at = tokenInfo.expires_at;
  tokenDoc.refresh_token = tokenInfo.refresh_token;
  tokenDoc.save();    
};


module.exports.updateBikeOdo = async(storedData, actualData) => {
  if(actualData) {
    storedData.bikes.forEach(async (storedBike) => {    
      const actualDataBike = await actualData.find(actualBike => actualBike.id === storedBike.id);
      if(actualDataBike.converted_distance !== storedBike.converted_distance) {
        storedBike.converted_distance = actualDataBike.converted_distance;
      }
    });  
  }
};