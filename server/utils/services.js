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


// module.exports.getActualBikeOdo = async(id, bikesInfo) => {
//   const actualBikeInfo = await bikesInfo.find(bike => bike.id === id);
  
//   return bikesInfo.converted_distance;
// };


module.exports.updateBikeOdo = async(storedData, actualData) => {
  storedData.bikes.forEach(async (bike) => {    
    const actualDataBike = await actualData.find(bicycle => bicycle.id === bike.id);
    if(actualDataBike.converted_distance !== bike.converted_distance) {
      bike.converted_distance = actualDataBike.converted_distance;
    }
  });  
};