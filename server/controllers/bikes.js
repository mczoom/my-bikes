const Bike = require('../models/bike');
const stravaToken = require('../models/stravaToken');


module.exports.addAllBikes = (req, res, next) => {
  const {
    converted_distance,
    id,
    name,
    retired
   } = req.body;
  const userID = req.user._id;

  return Bike.create({distance: converted_distance, id, name, retired, userID})
    .then((bike) => {
      res.send({ bike });
    })
    .catch(next);
};


module.exports.getAllBikes = (req, res, next) => {
  const owner = req.user._id;
  
  return stravaToken.find({_id: owner})
    .then((tokenData) => {
      res.send({ tok: tokenData.refresh_token });
    })
    .catch(next);
}
