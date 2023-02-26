const Bike = require('../models/bike');


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
  return Bike.find({owner})
    .then((bikes) => {
      res.send({ bikes });
    })
    .catch(next);
}